/* jshint -W117 */
'use strict';

(function(angular, undefined) {
    var app = angular.module('kundestyrtApp');

    app.filter('marked', ['$sce', '$cacheFactory', function($sce, $cacheFactory) {
        marked.setOptions({
            breaks: true
        });

        // caching has two features here. First of, it makes sure
        // we don't run marked too often. Second, it makes sure we
        // don't return a fresh result from $sce.trustAsHtml each
        // time. Angular has a "bug", where if you return
        // $sce.trustAsHtml in a filter, it will interpret this
        // as a new value (it can't compare them), and start a new
        // $digest-sycle.
        var cache = $cacheFactory('filter-marked', {capacity: 10});

        return function(input) {
            if(!input || !input.length) { return null; }

            var cached = cache.get(input);
            if(!cached) {
                cached = $sce.trustAsHtml(marked(input));
                cache.put(input, cached);
            }
            return cached;
        };
    }]);
})(angular);