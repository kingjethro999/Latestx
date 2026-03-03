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

export async function findCompatibleVersion(ecosystem, pkg, projectDependencies) {
    const apiKey = loadApiKey() || process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('GEMINI_API_KEY environment variable is missing, and no key is saved. Run `latestx auth`');
    }

    const ai = new GoogleGenAI({ apiKey });
    const spinner = ora(`Asking AI for the most compatible version of ${pkg} (this may take a moment)...`).start();

    try {
        const prompt = `
You are an expert dependency intelligence engine. The user wants to install the package "${pkg}" in their project.
The project uses ${ecosystem.language} (${ecosystem.framework || 'no specific'}) with ${ecosystem.packageManager}.

Here are their current project dependencies:
${JSON.stringify(projectDependencies, null, 2)}

Determine the safest, most compatible version of "${pkg}" to install that works well with their current dependencies.
Provide a strict JSON response analyzing compatibility. Your response MUST be valid JSON matching this schema exactly:
{
  "version": "exact-version-string-without-prefixes-like-v-or-caret",
  "reason": "Short explanation of why this version was chosen (e.g., 'Compatible with expo 50.0.0')"
}
`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        spinner.succeed('AI compatibility check complete.');

        try {
            return JSON.parse(response.text);
        } catch (parseError) {
            throw new Error("Failed to parse AI response as JSON.");
        }

    } catch (error) {
        spinner.fail('AI compatibility check failed.');
        throw error;
    }
}
