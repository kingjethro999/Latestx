import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import toml from 'toml';

// ─────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────
function readFile(cwd, file) {
    try { return readFileSync(join(cwd, file), 'utf8'); }
    catch { return ''; }
}

function existsAny(cwd, ...paths) {
    return paths.some(p => existsSync(join(cwd, p)));
}

// ─────────────────────────────────────────────
//  JAVASCRIPT / TYPESCRIPT
// ─────────────────────────────────────────────
function detectJavaScript(cwd, ecosystems, ref) {
    if (!existsAny(cwd, 'package.json')) return;

    let pkg = {};
    try {
        pkg = JSON.parse(readFile(cwd, 'package.json'));
        if (pkg.name) ref.name = pkg.name;
    } catch { }

    const deps = { ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies };
    const hasDep = (...names) => names.some(n => n in deps);
    const hasFile = (...files) => existsAny(cwd, ...files);

    // Package manager
    let pm = 'npm';
    if (hasFile('bun.lockb', 'bun.lock')) pm = 'bun';
    else if (hasFile('pnpm-lock.yaml')) pm = 'pnpm';
    else if (hasFile('yarn.lock')) pm = 'yarn';

    const lockfiles = { npm: 'package-lock.json', yarn: 'yarn.lock', pnpm: 'pnpm-lock.yaml', bun: 'bun.lockb' };

    // ── Mobile / Desktop ──────────────────────────────────────────────────────
    const isExpo        = hasDep('expo') || hasFile('app.json', 'app.config.js', 'app.config.ts');
    const isRN          = hasDep('react-native') && (isExpo || (hasFile('android') && hasFile('ios')));
    const isElectron    = hasDep('electron');
    const isTauri       = hasDep('@tauri-apps/api');
    const isCapacitor   = hasDep('@capacitor/core');
    const isIonic       = hasDep('@ionic/react', '@ionic/angular', '@ionic/vue', '@ionic/core');
    const isCordova     = hasFile('config.xml') && readFile(cwd, 'package.json').includes('cordova');
    const isNativeScript = hasDep('@nativescript/core', 'nativescript');

    // ── Full-stack / Meta frameworks ─────────────────────────────────────────
    const isNext        = hasDep('next') || hasFile('next.config.js', 'next.config.ts', 'next.config.mjs');
    const isNuxt        = hasDep('nuxt', 'nuxt3') || hasFile('nuxt.config.js', 'nuxt.config.ts');
    const isSvelteKit   = hasDep('@sveltejs/kit') || hasFile('svelte.config.js', 'svelte.config.ts');
    const isRemix       = hasDep('@remix-run/react', '@remix-run/node', '@remix-run/serve');
    const isAstro       = hasDep('astro') || hasFile('astro.config.mjs', 'astro.config.ts');
    const isGatsby      = hasDep('gatsby') || hasFile('gatsby-config.js', 'gatsby-config.ts');
    const isRedwoodJS   = hasDep('@redwoodjs/core') || hasFile('redwood.toml');
    const isBlitz       = hasDep('blitz') || hasFile('blitz.config.js');
    const isDocusaurus  = hasDep('@docusaurus/core');
    const isVitepress   = hasDep('vitepress') || hasFile('.vitepress/config.js', '.vitepress/config.ts');
    const isAnalog      = hasDep('@analogjs/core');         // Angular meta-framework

    // ── Backend frameworks ────────────────────────────────────────────────────
    const isNestJS      = hasDep('@nestjs/core');
    const isExpress     = hasDep('express');
    const isFastify     = hasDep('fastify');
    const isKoa         = hasDep('koa');
    const isHapi        = hasDep('@hapi/hapi');
    const isHono        = hasDep('hono');
    const isElysia      = hasDep('elysia');
    const isTRPC        = hasDep('@trpc/server');
    const isFeathers    = hasDep('@feathersjs/feathers');
    const isAdonis      = hasFile('.adonisrc.json') || hasDep('@adonisjs/core');
    const isMeteor      = hasFile('.meteor');
    const isStrapi      = hasDep('@strapi/strapi') || hasFile('config/server.js');
    const isKeystone    = hasDep('@keystone-6/core');
    const isPayload     = hasDep('payload');
    const isDirectus    = hasDep('directus');
    const isLoopback    = hasDep('@loopback/core');

    // ── Frontend frameworks ───────────────────────────────────────────────────
    const isAngular     = hasDep('@angular/core') || hasFile('angular.json');
    const isReact       = hasDep('react') || hasFile('node_modules/react');
    const isVue         = hasDep('vue') || hasFile('vue.config.js');
    const isSvelte      = hasDep('svelte');
    const isSolid       = hasDep('solid-js');
    const isQwik        = hasDep('@builder.io/qwik');
    const isPreact      = hasDep('preact');
    const isLit         = hasDep('lit', 'lit-element');
    const isAlpine      = hasDep('alpinejs');
    const isHtmx        = hasDep('htmx.org');
    const isStimulus    = hasDep('@hotwired/stimulus');
    const isEmberJS     = hasDep('ember-source') || hasFile('ember-cli-build.js');
    const isBackbone    = hasDep('backbone');

    // ── Assign framework (most specific → least) ─────────────────────────────
    let framework = 'node';

    if      (isExpo)         framework = 'expo';
    else if (isRN)           framework = 'react-native';
    else if (isNativeScript) framework = 'nativescript';
    else if (isCapacitor && isIonic) framework = 'ionic-capacitor';
    else if (isIonic)        framework = 'ionic';
    else if (isCordova)      framework = 'cordova';
    else if (isTauri)        framework = 'tauri';
    else if (isElectron)     framework = 'electron';
    else if (isNext)         framework = 'nextjs';
    else if (isNuxt)         framework = 'nuxt';
    else if (isSvelteKit)    framework = 'sveltekit';
    else if (isRemix)        framework = 'remix';
    else if (isAstro)        framework = 'astro';
    else if (isGatsby)       framework = 'gatsby';
    else if (isRedwoodJS)    framework = 'redwoodjs';
    else if (isBlitz)        framework = 'blitz';
    else if (isDocusaurus)   framework = 'docusaurus';
    else if (isVitepress)    framework = 'vitepress';
    else if (isAnalog)       framework = 'analogjs';
    else if (isNestJS)       framework = 'nestjs';
    else if (isAdonis)       framework = 'adonisjs';
    else if (isMeteor)       framework = 'meteor';
    else if (isStrapi)       framework = 'strapi';
    else if (isKeystone)     framework = 'keystone';
    else if (isPayload)      framework = 'payload';
    else if (isDirectus)     framework = 'directus';
    else if (isLoopback)     framework = 'loopback';
    else if (isElysia)       framework = 'elysia';
    else if (isHono)         framework = 'hono';
    else if (isFastify)      framework = 'fastify';
    else if (isHapi)         framework = 'hapi';
    else if (isFeathers)     framework = 'feathersjs';
    else if (isKoa)          framework = 'koa';
    else if (isExpress)      framework = 'express';
    else if (isAngular)      framework = 'angular';
    else if (isEmberJS)      framework = 'ember';
    else if (isQwik)         framework = 'qwik';
    else if (isSolid)        framework = 'solidjs';
    else if (isSvelte)       framework = 'svelte';
    else if (isVue)          framework = 'vue';
    else if (isLit)          framework = 'lit';
    else if (isPreact)       framework = 'preact';
    else if (isAlpine)       framework = 'alpinejs';
    else if (isHtmx)         framework = 'htmx';
    else if (isStimulus)     framework = 'stimulus';
    else if (isBackbone)     framework = 'backbone';
    else if (isReact)        framework = 'react';
    else if (isTRPC)         framework = 'trpc';

    ecosystems.push({
        language: 'javascript',
        framework,
        packageManager: pm,
        manifest: 'package.json',
        lockfile: lockfiles[pm]
    });
}

// ─────────────────────────────────────────────
//  PYTHON
// ─────────────────────────────────────────────
function detectPython(cwd, ecosystems, ref) {
    const hasPyproject   = existsAny(cwd, 'pyproject.toml');
    const hasRequirements = existsAny(cwd, 'requirements.txt');
    const hasSetupPy     = existsAny(cwd, 'setup.py');
    const hasSetupCfg    = existsAny(cwd, 'setup.cfg');
    const hasPipfile     = existsAny(cwd, 'Pipfile');

    if (!hasPyproject && !hasRequirements && !hasSetupPy && !hasSetupCfg && !hasPipfile) return;

    // Package manager / manifest
    let pm = 'pip', manifest = 'requirements.txt', lockfile = null;

    if (hasPyproject) {
        manifest = 'pyproject.toml';
        try {
            const parsed = toml.parse(readFile(cwd, 'pyproject.toml'));
            if (parsed.project?.name) ref.name = parsed.project.name;
            else if (parsed.tool?.poetry?.name) ref.name = parsed.tool.poetry.name;
        } catch { }

        if (existsAny(cwd, 'uv.lock'))     { pm = 'uv';     lockfile = 'uv.lock'; }
        else if (existsAny(cwd, 'pdm.lock')) { pm = 'pdm';   lockfile = 'pdm.lock'; }
        else if (existsAny(cwd, 'poetry.lock')) { pm = 'poetry'; lockfile = 'poetry.lock'; }
    } else if (hasPipfile) {
        manifest = 'Pipfile'; pm = 'pipenv'; lockfile = 'Pipfile.lock';
    }

    // Scan all dep files for framework hints
    const allDeps = [
        readFile(cwd, 'requirements.txt'),
        readFile(cwd, 'pyproject.toml'),
        readFile(cwd, 'Pipfile'),
        readFile(cwd, 'setup.py'),
        readFile(cwd, 'setup.cfg'),
    ].join('\n').toLowerCase();

    const has = (...names) => names.some(n => allDeps.includes(n.toLowerCase()));

    let framework = null;

    // Web frameworks
    if      (existsAny(cwd, 'manage.py'))     framework = 'django';   // strongest signal
    else if (has('django'))                    framework = 'django';
    else if (has('fastapi'))                   framework = 'fastapi';
    else if (has('flask'))                     framework = 'flask';
    else if (has('tornado'))                   framework = 'tornado';
    else if (has('sanic'))                     framework = 'sanic';
    else if (has('litestar'))                  framework = 'litestar';
    else if (has('starlette'))                 framework = 'starlette';
    else if (has('falcon'))                    framework = 'falcon';
    else if (has('bottle'))                    framework = 'bottle';
    else if (has('pyramid'))                   framework = 'pyramid';
    else if (has('cherrypy'))                  framework = 'cherrypy';
    else if (has('aiohttp'))                   framework = 'aiohttp';
    else if (has('grpcio', 'grpc'))            framework = 'grpc';
    else if (has('robyn'))                     framework = 'robyn';
    else if (has('blacksheep'))                framework = 'blacksheep';

    // Data / ML / AI dashboards
    else if (has('streamlit'))                 framework = 'streamlit';
    else if (has('gradio'))                    framework = 'gradio';
    else if (has('dash'))                      framework = 'dash';
    else if (has('panel'))                     framework = 'panel';
    else if (has('reflex'))                    framework = 'reflex';
    else if (has('nicegui'))                   framework = 'nicegui';

    ecosystems.push({ language: 'python', framework, packageManager: pm, manifest, lockfile });
}

// ─────────────────────────────────────────────
//  PHP
// ─────────────────────────────────────────────
function detectPHP(cwd, ecosystems, ref) {
    if (!existsAny(cwd, 'composer.json')) return;

    let pkg = {};
    try {
        pkg = JSON.parse(readFile(cwd, 'composer.json'));
        if (pkg.name) ref.name = pkg.name;
    } catch { }

    const deps = { ...pkg.require, ...pkg['require-dev'] };
    const hasDep = (...names) => names.some(n => n in deps);
    const hasFile = (...files) => existsAny(cwd, ...files);

    let framework = null;

    // MVC / Full-stack
    if      (hasFile('artisan') || hasDep('laravel/framework'))                        framework = 'laravel';
    else if (hasDep('symfony/symfony', 'symfony/framework-bundle'))                    framework = 'symfony';
    else if (hasDep('codeigniter4/framework', 'codeigniter/framework'))               framework = 'codeigniter';
    else if (hasDep('cakephp/cakephp'))                                               framework = 'cakephp';
    else if (hasDep('yiisoft/yii2', 'yiisoft/yii'))                                   framework = 'yii';
    else if (hasDep('laminas/laminas-mvc', 'zendframework/zendframework'))            framework = 'laminas';
    else if (hasDep('phalcon/phalcon'))                                               framework = 'phalcon';
    else if (hasDep('nette/application'))                                             framework = 'nette';
    else if (hasDep('fuel/fuel'))                                                     framework = 'fuelphp';

    // Micro / API
    else if (hasDep('slim/slim'))                                                     framework = 'slim';
    else if (hasDep('laravel/lumen', 'lumen/lumen-framework'))                       framework = 'lumen';
    else if (hasDep('flight/flight'))                                                 framework = 'flight';
    else if (hasDep('klein/klein'))                                                   framework = 'klein';
    else if (hasDep('bramus/router'))                                                 framework = 'bramus-router';

    // CMS
    else if (hasFile('wp-config.php', 'wp-config-sample.php') || hasDep('roots/wordpress')) framework = 'wordpress';
    else if (hasDep('drupal/core'))                                                   framework = 'drupal';
    else if (hasDep('joomla/application'))                                            framework = 'joomla';
    else if (hasDep('craftcms/cms'))                                                  framework = 'craftcms';
    else if (hasDep('statamic/cms'))                                                  framework = 'statamic';
    else if (hasDep('getgrav/grav'))                                                  framework = 'grav';
    else if (hasDep('october/system') || hasFile('plugins/october'))                 framework = 'october-cms';

    ecosystems.push({ language: 'php', framework, packageManager: 'composer', manifest: 'composer.json', lockfile: 'composer.lock' });
}

// ─────────────────────────────────────────────
//  RUBY
// ─────────────────────────────────────────────
function detectRuby(cwd, ecosystems, ref) {
    if (!existsAny(cwd, 'Gemfile')) return;

    const gemfile = readFile(cwd, 'Gemfile').toLowerCase();
    const has = (...names) => names.some(n => gemfile.includes(n));

    // Best-effort project name from Rakefile or .gemspec
    if (!ref.name || ref.name === 'unknown-project') {
        const rakefile = readFile(cwd, 'Rakefile');
        const match = rakefile.match(/spec\.name\s*=\s*["']([^"']+)/);
        if (match) ref.name = match[1];
    }

    let framework = null;

    if      (has("'rails'", '"rails"'))       framework = 'rails';
    else if (has("'sinatra'", '"sinatra"'))   framework = 'sinatra';
    else if (has("'hanami'", '"hanami"'))     framework = 'hanami';
    else if (has("'padrino'", '"padrino"'))   framework = 'padrino';
    else if (has("'grape'", '"grape"'))       framework = 'grape';
    else if (has("'roda'", '"roda"'))         framework = 'roda';
    else if (has("'cuba'", '"cuba"'))         framework = 'cuba';
    else if (has("'camping'", '"camping"'))   framework = 'camping';
    else if (has("'jekyll'", '"jekyll"'))     framework = 'jekyll';
    else if (has("'middleman'", '"middleman"')) framework = 'middleman';
    else if (has("'bridgetown'", '"bridgetown"')) framework = 'bridgetown';

    ecosystems.push({ language: 'ruby', framework, packageManager: 'bundler', manifest: 'Gemfile', lockfile: 'Gemfile.lock' });
}

// ─────────────────────────────────────────────
//  GO
// ─────────────────────────────────────────────
function detectGo(cwd, ecosystems, ref) {
    if (!existsAny(cwd, 'go.mod')) return;

    const gomod = readFile(cwd, 'go.mod');
    const has = (text) => gomod.includes(text);

    const moduleMatch = gomod.match(/^module\s+(.+)$/m);
    if (moduleMatch) ref.name = moduleMatch[1].trim().split('/').pop();

    let framework = null;

    if      (has('github.com/gin-gonic/gin'))           framework = 'gin';
    else if (has('github.com/gofiber/fiber'))           framework = 'fiber';
    else if (has('github.com/labstack/echo'))           framework = 'echo';
    else if (has('github.com/go-chi/chi'))              framework = 'chi';
    else if (has('github.com/cloudwego/hertz'))         framework = 'hertz';
    else if (has('github.com/valyala/fasthttp'))        framework = 'fasthttp';
    else if (has('github.com/beego/beego') || has('github.com/astaxie/beego')) framework = 'beego';
    else if (has('github.com/revel/revel'))             framework = 'revel';
    else if (has('github.com/gobuffalo/buffalo'))       framework = 'buffalo';
    else if (has('github.com/gorilla/mux'))             framework = 'gorilla-mux';
    else if (has('github.com/go-fuego/fuego'))          framework = 'fuego';
    else if (has('github.com/danielgtaylor/huma'))      framework = 'huma';
    else if (has('github.com/uptrace/bun'))             framework = 'bun-orm';
    else if (has('gorm.io/gorm'))                       framework = 'gorm';
    else if (has('entgo.io/ent'))                       framework = 'ent';

    ecosystems.push({ language: 'go', framework, packageManager: 'go', manifest: 'go.mod', lockfile: 'go.sum' });
}

// ─────────────────────────────────────────────
//  RUST
// ─────────────────────────────────────────────
function detectRust(cwd, ecosystems, ref) {
    if (!existsAny(cwd, 'Cargo.toml')) return;

    try {
        const parsed = toml.parse(readFile(cwd, 'Cargo.toml'));
        if (parsed.package?.name) ref.name = parsed.package.name;
    } catch { }

    const cargo = readFile(cwd, 'Cargo.toml');
    const has = (text) => cargo.includes(text);

    let framework = null;

    // Web / API
    if      (has('actix-web'))                  framework = 'actix-web';
    else if (has('axum'))                       framework = 'axum';
    else if (has('rocket'))                     framework = 'rocket';
    else if (has('warp'))                       framework = 'warp';
    else if (has('ntex'))                       framework = 'ntex';
    else if (has('poem'))                       framework = 'poem';
    else if (has('salvo'))                      framework = 'salvo';
    else if (has('tide'))                       framework = 'tide';
    else if (has('gotham'))                     framework = 'gotham';
    else if (has('tower-http') || has('"tower"')) framework = 'tower';

    // Frontend / WASM / cross-platform
    else if (has('leptos'))                     framework = 'leptos';
    else if (has('dioxus'))                     framework = 'dioxus';
    else if (has('"yew"'))                      framework = 'yew';
    else if (has('sycamore'))                   framework = 'sycamore';
    else if (has('tauri'))                      framework = 'tauri';

    // ORM / DB (used when no web framework present)
    else if (has('diesel'))                     framework = 'diesel';
    else if (has('sea-orm') || has('sea_orm'))  framework = 'sea-orm';
    else if (has('sqlx'))                       framework = 'sqlx';

    ecosystems.push({ language: 'rust', framework, packageManager: 'cargo', manifest: 'Cargo.toml', lockfile: 'Cargo.lock' });
}

// ─────────────────────────────────────────────
//  DART / FLUTTER
// ─────────────────────────────────────────────
function detectDart(cwd, ecosystems, ref) {
    if (!existsAny(cwd, 'pubspec.yaml')) return;

    const pubspec = readFile(cwd, 'pubspec.yaml');
    const has = (text) => pubspec.includes(text);

    const nameMatch = pubspec.match(/^name:\s*(.+)$/m);
    if (nameMatch) ref.name = nameMatch[1].trim();

    let framework = 'dart';
    let pm = 'dart';

    const isFlutter = has('flutter:') || has('flutter_test:') || has('sdk: flutter');

    if (isFlutter) {
        pm = 'flutter';
        // Sub-frameworks / state management
        if      (has('dart_frog'))                         framework = 'dart_frog';
        else if (has('jaspr'))                             framework = 'jaspr';
        else if (has('flame'))                             framework = 'flame';
        else if (has('flutter_bloc') || has('bloc:'))      framework = 'flutter-bloc';
        else if (has('flutter_riverpod') || has('riverpod')) framework = 'flutter-riverpod';
        else if (has('get:') || has('getx'))               framework = 'flutter-getx';
        else if (has('mobx'))                              framework = 'flutter-mobx';
        else if (has('provider:'))                         framework = 'flutter-provider';
        else                                               framework = 'flutter';
    } else {
        // Server-side Dart
        if      (has('shelf'))                             framework = 'shelf';
        else if (has('conduit') || has('aqueduct'))        framework = 'conduit';
        else if (has('angel_framework') || has('angel3'))  framework = 'angel';
    }

    ecosystems.push({ language: 'dart', framework, packageManager: pm, manifest: 'pubspec.yaml', lockfile: 'pubspec.lock' });
}

// ─────────────────────────────────────────────
//  MAIN ENTRY
// ─────────────────────────────────────────────
export async function analyzeWorkspace(cwd) {
    const ecosystems = [];
    const ref = { name: 'unknown-project' };

    detectJavaScript(cwd, ecosystems, ref);
    detectPython(cwd, ecosystems, ref);
    detectPHP(cwd, ecosystems, ref);
    detectRuby(cwd, ecosystems, ref);
    detectGo(cwd, ecosystems, ref);
    detectRust(cwd, ecosystems, ref);
    detectDart(cwd, ecosystems, ref);

    if (ecosystems.length === 0) {
        throw new Error(
            'No supported ecosystem detected in the current directory.\n' +
            'Supported languages: JavaScript/TypeScript, Python, PHP, Ruby, Go, Rust, Dart/Flutter.\n' +
            'Make sure you run latestx from the root of your project where your manifest file lives.'
        );
    }

    return { projectName: ref.name, ecosystems };
}