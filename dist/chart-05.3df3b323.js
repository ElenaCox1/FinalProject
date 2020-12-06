// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/chart-05.js":[function(require,module,exports) {
// import * as d3 from 'd3'
// import d3Tip from 'd3-tip'
// import d3Annotation from 'd3-svg-annotation'
// const margin = { top: 50, left: 50, right: 50, bottom: 50 }
// const height = 400 - margin.top - margin.bottom
// const width = 700 - margin.left - margin.right
// const svg = d3
//   .select('#chart-5')
//   .append('svg')
//   .attr('height', height + margin.top + margin.bottom)
//   .attr('width', width + margin.left + margin.right)
//   .append('g')
//   .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
// const xPositionScale = d3
//   .scaleLinear()
//   .domain([1, 34])
//   .range([0, width])
// const yPositionScale = d3
//   .scaleLinear()
//   .domain([0, 90])
//   .range([height, 0])
// const colorScale = d3
//   .scaleOrdinal()
//   .domain(['Bush', 'Obama', 'Trump'])
//   .range(['blue', 'black', 'red'])
// // Create a d3.line function
// const line = d3
//   .line()
//   .x(d => xPositionScale(d.Month))
//   .y(d => yPositionScale(d.Cumulative))
// d3.csv(require('/data/USA_trips_cumulative.csv')).then(ready)
// // grouping
// function ready(datapoints) {
//   const nested = d3
//     .nest()
//     .key(d => d.President)
//     .entries(datapoints)
//   console.log(nested)
//   // first circles
//   svg
//     .selectAll('circle')
//     .data(datapoints)
//     .enter()
//     .append('circle')
//     .attr('fill', d => colorScale(d.President))
//     .attr('r', '5')
//     .attr('cx', d => {
//       return xPositionScale(d.Month)
//     })
//     .attr('cy', d => {
//       return yPositionScale(d.Cumulative)
//     })
//   // text
//   svg
//     .selectAll('text')
//     .data(nested)
//     .enter()
//     .append('text')
//     .attr('fill', d => colorScale(d.key))
//     .attr('font-weight', 600)
//     .text(d => d.key)
//     .attr('x', 0)
//     .attr('y', function(d) {
//       console.log(d.values)
//       const datapoints = d.values
//       // Finds the first datapoint
//       const finData = datapoints[datapoints.length - 16]
//       // Use the yPositionScale and the value to position our text
//       return yPositionScale(finData.Month)
//     })
//     .attr('font-size', 18)
//     .attr('dx', 10)
//     .attr('dy', 0)
//     .attr('class', d => d.key)
//     .on('mouseover', d => {
//       console.log('hello')
//       const className = d.key
//       svg
//         .selectAll('text.' + className)
//         .attr('font-size', 25)
//         .raise()
//     })
//     .on('mouseout', d => {
//       const className = d.key
//       svg.selectAll('text.' + className).attr('font-size', 15)
//     })
//   svg
//     .selectAll('path')
//     .data(nested)
//     .enter()
//     .append('path')
//     .attr('fill', 'none')
//     .attr('stroke-width', 2)
//     .attr('stroke', d => colorScale(d.key))
//     .attr('d', function(d) {
//       console.log('this nested thing is', d)
//       return line(d.values)
//     })
//     .attr('class', d => d.key) // Axis
//   /*     .on('mouseover', d => {
//       console.log('hello')
//       const className = d.key
//       svg
//         .selectAll('path.' + className)
//         .attr('stroke-width', 8        .selectAll('text.' + className)
//         .attr('font-size', 25)
//         .raise()
//     })
//     .on('mouseout', d => {
//       const className = d.key
//       svg.selectAll('path.' + className).attr('stroke-width', 4)
//     })
//  */ const yAxis = d3
//     .axisLeft(yPositionScale)
//     .tickPadding(0.5)
//   svg
//     .append('g')
//     .attr('class', 'axis y-axis')
//     .call(yAxis)
//   const xAxis = d3.axisBottom(xPositionScale).tickFormat(d3.format('d'))
//   svg
//     .append('g')
//     .attr('class', 'axis x-axis')
//     .attr('transform', 'translate(0,' + height + ')')
//     .call(xAxis)
// }
},{}]},{},["scripts/chart-05.js"], null)
//# sourceMappingURL=/chart-05.3df3b323.js.map