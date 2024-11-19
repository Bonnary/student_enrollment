import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface PieChartProps {
  data: { label: string; value: number }[];
  width?: number;
  height?: number;
}

function PieChart({ data, width = 400, height = 400 }: PieChartProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const radius = Math.min(width, height) / 2;

    svg.selectAll("*").remove();

    const pie = d3
      .pie<{ label: string; value: number }>()
      .value((d) => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    g.selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc as any)
      .attr("fill", (_, i) => colorScale(i.toString()));

    // Function to position labels
    const midAngle = (d: any) => d.startAngle + (d.endAngle - d.startAngle) / 2;

    // Add labels with better positioning
    g.selectAll("text")
      .data(pie(data))
      .enter()
      .append("text")
      .attr("transform", (d: any) => {
        const pos = arc.centroid(d);
        const x = pos[0]; // Move labels further out
        const y = pos[1];
        return `translate(${x},${y})`;
      })
      .attr("dy", "0.35em") // Vertical alignment
      .attr("text-anchor", (d: any) => {
        // Align text based on which side of the pie it's on
        return midAngle(d) < Math.PI ? "start" : "end";
      })
      .attr("font-size", `${Math.min(radius / 15, 14)}px`) // Responsive font size
      .text((d) => {
        const label = d.data.label;
        // Truncate text if too long
        return label.length > 15 ? label.substring(0, 12) + "..." : label;
      });
  }, [data, width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
}

export default PieChart;
