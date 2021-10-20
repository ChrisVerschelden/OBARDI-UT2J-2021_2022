var TimeKnots = {
  draw: function (a, b, c) {
    var d = {
      width: 600,
      height: 200,
      radius: 10,
      lineWidth: 4,
      color: "#999",
      background: "#FFF",
      dateFormat: "%Y/%m/%d %H:%M:%S",
      horizontalLayout: !0,
      showLabels: !1,
      labelFormat: "%Y/%m/%d %H:%M:%S",
      addNow: !1,
      seriesColor: d3.scale.category20(),
      dateDimension: !0,
    };
    if (void 0 != c) for (var e in c) d[e] = c[e];
    0 != d.addNow &&
      b.push({ date: new Date(), name: d.addNowLabel || "Today" });
    var f = d3
        .select(a)
        .append("div")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("font-family", "Helvetica Neue")
        .style("font-weight", "300")
        .style("background", "rgba(0,0,0,0.5)")
        .style("color", "white")
        .style("padding", "5px 10px 5px 10px")
        .style("-moz-border-radius", "8px 8px")
        .style("border-radius", "8px 8px"),
      g = d3
        .select(a)
        .append("svg")
        .attr("width", d.width)
        .attr("height", d.height);
    if (d.dateDimension)
      var h = b.map(function (a) {
          return Date.parse(a.date);
        }),
        i = d3.max(h),
        j = d3.min(h);
    else
      var h = b.map(function (a) {
          return a.value;
        }),
        i = d3.max(h),
        j = d3.min(h);
    var k =
        1.5 *
          (d3.max(
            b.map(function (a) {
              return a.radius;
            })
          ) || d.radius) +
        d.lineWidth,
      l = d.horizontalLayout
        ? (d.width - 2 * k) / (i - j)
        : (d.height - 2 * k) / (i - j),
      m = [];
    if (
      (i == j &&
        ((l = 0), (k = d.horizontalLayout ? d.width / 2 : d.height / 2)),
      (linePrevious = { x1: null, x2: null, y1: null, y2: null }),
      g
        .selectAll("line")
        .data(b)
        .enter()
        .append("line")
        .attr("class", "timeline-line")
        .attr("x1", function (a) {
          var b;
          if (d.horizontalLayout) {
            var c = d.dateDimension ? new Date(a.date).getTime() : a.value;
            b = Math.floor(l * (c - j) + k);
          } else b = Math.floor(d.width / 2);
          return (linePrevious.x1 = b), b;
        })
        .attr("x2", function (a) {
          if (null != linePrevious.x1) return linePrevious.x1;
          if (d.horizontalLayout) {
            var b = d.dateDimension ? new Date(a.date).getTime() : a.value;
            ret = Math.floor(l * (b - j));
          }
          return Math.floor(d.width / 2);
        })
        .attr("y1", function (a) {
          var b;
          if (d.horizontalLayout) b = Math.floor(d.height / 2);
          else {
            var c = d.dateDimension ? new Date(a.date).getTime() : a.value;
            b = Math.floor(l * (c - j)) + k;
          }
          return (linePrevious.y1 = b), b;
        })
        .attr("y2", function (a) {
          if (null != linePrevious.y1) return linePrevious.y1;
          if (d.horizontalLayout) return Math.floor(d.height / 2);
          var b = d.dateDimension ? new Date(a.date).getTime() : a.value;
          return Math.floor(l * (b - j));
        })
        .style("stroke", function (a) {
          return void 0 != a.color
            ? a.color
            : void 0 != a.series
            ? (m.indexOf(a.series) < 0 && m.push(a.series),
              d.seriesColor(m.indexOf(a.series)))
            : d.color;
        })
        .style("stroke-width", d.lineWidth),
      g
        .selectAll("circle")
        .data(b)
        .enter()
        .append("circle")
        .attr("class", "timeline-event")
        .attr("r", function (a) {
          return void 0 != a.radius ? a.radius : d.radius;
        })
        .style("stroke", function (a) {
          return void 0 != a.color
            ? a.color
            : void 0 != a.series
            ? (m.indexOf(a.series) < 0 && m.push(a.series),
              console.log(a.series, m, m.indexOf(a.series)),
              d.seriesColor(m.indexOf(a.series)))
            : d.color;
        })
        .style("stroke-width", function (a) {
          return void 0 != a.lineWidth ? a.lineWidth : d.lineWidth;
        })
        .style("fill", function (a) {
          return void 0 != a.background ? a.background : d.background;
        })
        .attr("cy", function (a) {
          if (d.horizontalLayout) return Math.floor(d.height / 2);
          var b = d.dateDimension ? new Date(a.date).getTime() : a.value;
          return Math.floor(l * (b - j) + k);
        })
        .attr("cx", function (a) {
          if (d.horizontalLayout) {
            var b = d.dateDimension ? new Date(a.date).getTime() : a.value,
              c = Math.floor(l * (b - j) + k);
            return c;
          }
          return Math.floor(d.width / 2);
        })
        .on("mouseover", function (a) {
          if (d.dateDimension)
            var b = d3.time.format(d.dateFormat),
              c = b(new Date(a.date)),
              e = "" != c ? a.name + " <small>(" + c + ")</small>" : a.name;
          else
            var b = function (a) {
                return a;
              },
              c = a.value,
              e = a.name + " <small>(" + a.value + ")</small>";
          d3
            .select(this)
            .style("fill", function (a) {
              return void 0 != a.color ? a.color : d.color;
            })
            .transition()
            .duration(100)
            .attr("r", function (a) {
              return void 0 != a.radius
                ? Math.floor(1.5 * a.radius)
                : Math.floor(1.5 * d.radius);
            }),
            f.html(""),
            void 0 != a.img &&
              f
                .append("img")
                .style("float", "left")
                .style("margin-right", "4px")
                .attr("src", a.img)
                .attr("width", "64px"),
            f.append("div").style("float", "left").html(e),
            f.transition().duration(100).style("opacity", 0.9);
        })
        .on("mouseout", function () {
          d3
            .select(this)
            .style("fill", function (a) {
              return void 0 != a.background ? a.background : d.background;
            })
            .transition()
            .duration(100)
            .attr("r", function (a) {
              return void 0 != a.radius ? a.radius : d.radius;
            }),
            f.transition().duration(100).style("opacity", 0);
        }),
      0 != d.showLabels)
    ) {
      if (d.dateDimension)
        var n = d3.time.format(d.labelFormat),
          o = n(new Date(j)),
          p = n(new Date(i));
      else
        var n = function (a) {
            return a;
          },
          o = j,
          p = i;
      g
        .append("text")
        .text(o)
        .style("font-size", "70%")
        .attr("x", function (a) {
          return d.horizontalLayout
            ? d3.max([0, k - this.getBBox().width / 2])
            : Math.floor(this.getBBox().width / 2);
        })
        .attr("y", function (a) {
          return d.horizontalLayout
            ? Math.floor(d.height / 2 + (k + this.getBBox().height))
            : k + this.getBBox().height / 2;
        }),
        g
          .append("text")
          .text(p)
          .style("font-size", "70%")
          .attr("x", function (a) {
            return d.horizontalLayout
              ? d.width -
                  d3.max([this.getBBox().width, k + this.getBBox().width / 2])
              : Math.floor(this.getBBox().width / 2);
          })
          .attr("y", function (a) {
            return d.horizontalLayout
              ? Math.floor(d.height / 2 + (k + this.getBBox().height))
              : d.height - k + this.getBBox().height / 2;
          });
    }
    g.on("mousemove", function () {
      return (
        (tipPixels = parseInt(f.style("height").replace("px", ""))),
        f
          .style("top", d3.event.pageY - tipPixels - k + "px")
          .style("left", d3.event.pageX + 20 + "px")
      );
    }).on("mouseout", function () {
      return f.style("opacity", 0).style("top", "0px").style("left", "0px");
    });
  },
};
