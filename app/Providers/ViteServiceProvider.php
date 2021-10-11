<?php

namespace App\Providers;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\File;
use Illuminate\Support\HtmlString;
use Illuminate\Support\ServiceProvider;

class ViteServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        Blade::directive('vite', function () {
            if (App::isLocal()) {
                    return new HtmlString(<<<HTML
                <script type="module" src="http://localhost:3000/resources/js/app.js"></script>
            HTML);
            }
            $manifest = json_decode(File::get(public_path('dist/manifest.json')), true);
            return new HtmlString(<<<HTML
            <script type="module" src="/dist/{$manifest['resources/js/app.js']['file']}"></script>
            <link rel="stylesheet" href="/dist/{$manifest['resources/js/app.js']['css'][0]}">
        HTML);
        });
    }
}
