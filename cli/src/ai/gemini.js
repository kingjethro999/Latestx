import { GoogleGenAI } from '@google/genai';
import pc from 'picocolors';
import ora from 'ora';
import { loadApiKey } from '../core/auth.js';

export async function analyzeCompatibility(ecosystem, updates) {
    const apiKey = process.env.GEMINI_API_KEY || loadApiKey();
    if (!apiKey) {
        throw new Error('GEMINI_API_KEY environment variable is missing, and no key is saved. Run `latestx auth`');
    }

    const ai = new GoogleGenAI({ apiKey });
    const spinner = ora('Running AI compatibility analysis (this may take a moment)...').start();

    try {
        const prompt = `
You are an expert dependency intelligence engine. Analyze the following dependency updates for a ${ecosystem.language} (${ecosystem.framework || 'no specific'}) project using ${ecosystem.packageManager}.

Updates proposed:
${JSON.stringify(updates, null, 2)}

Provide a strict JSON response analyzing compatibility. Your response MUST be valid JSON matching this schema exactly:
{
  "safeToUpdate": ["package-name"],
  "blockedPackages": [
    {
      "name": "package-name",
      "reason": "Short explanation of why this update is blocked (e.g., peer dependency conflict, known framework issue)"
    }
  ],
  "advisory": "A very brief overall recommendation"
}
`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        spinner.succeed('AI analysis complete.');

        try {
            return JSON.parse(response.text);
        } catch (parseError) {
            throw new Error("Failed to parse AI response as JSON.");
        }

    } catch (error) {
        spinner.fail('AI analysis failed.');
        throw error;
    }
}
