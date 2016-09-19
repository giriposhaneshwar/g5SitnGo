(function () {
    'use strict';

    angular
        .module('app')
        .controller('SitNGo.IndexController', ["$scope",  function ($scope) {

            var svgL = d3.select("#latex").append("svg").attr("width",400).attr("height",100)
            var svgM = d3.select("#latex").append("mathml").attr("width",400).attr("height",100)

            var text = svgM.append("foreignObject").attr("width",200).attr("height",100)
            text.html("<math display=\"block\"><mrow><mi>x</mi><mo>=</mo><mfrac><mrow><mo>−</mo><mi>b</mi><mo>±</mo><msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn><mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></mrow></math>");

            var text = svgL.append("foreignObject").attr("width",200).attr("height",100)
            text.text("$$ x = \\sum_{i \\in A} i^{2} $$")

            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

    }])
})();