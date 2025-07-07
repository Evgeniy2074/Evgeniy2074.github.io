(function () {
    'use strict';

    function startPlugin() {
        if (typeof Lampa === 'undefined' || !Lampa.Source || !Lampa.Source.add) {
            setTimeout(startPlugin, 1000);
            return;
        }

        console.log('[MySource] плагин инициализируется...');

        function manifest() {
            return {
                version: '1.0',
                name: 'MySource',
                author: 'Evgeniy2074',
                description: 'Источник через GitHub Pages',
                type: 'movie',
                url: 'https://evgeniy2074.github.io/myplugin_source.js',
                status: true
            };
        }

        Lampa.Source.add({
            name: 'MySource',
            version: '1.0',
            author: 'Evgeniy2074',
            type: 'movie',
            active: true,
            proxy: false,
            executable: true,
            url: 'mysource',
            manifest: manifest,

            search: function (query, year, type) {
                return new Promise(function (resolve) {
                    console.log('[MySource] search:', query, year);
                    resolve([
                        {
                            title: '🎬 Big Buck Bunny (тест)',
                            url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                            quality: 'HD',
                            info: 'Тестовый источник',
                            poster: 'https://via.placeholder.com/300x450?text=Test'
                        }
                    ]);
                });
            },

            resolve: function (url, options = {}, callback) {
                callback({
                    url: url,
                    method: 'play'
                });
            }
        });

        console.log('[MySource] зарегистрирован!');
    }

    startPlugin();
})();
