# react-chart
A simple React chart library

![](https://github.com/dgoemans/react-chart/workflows/Node%20CI/badge.svg)

## Contents:
Supports the following chart(s):
* Pie Chart
* Bar Chart
* Line/Area Chart

## Pie Chart
### Usage:
```javascript
<PieChart 
    data={
    [
        {name: "USA", amount: 0.4254},
        {name:"Netherlands", amount: 0.2322},
        {name:"South Africa", amount: 0.1716},
        {name:"Maldives", amount: 0.121},
        {name:"Belgium", amount: 0.0498}
    ]}
    legend={true}
    size={400}
    donut={true}
    donutThickness={0.6}
/>
```

### Props:
|Name          |Description         |
|--------------|--------------------|
|`data`          |The data set, consisting of `name`, `amount` (value between 0 and 1) and an optional `color` (required)|
|`size`          |The size of the chart in pixels (required)|
|`legend`        |Whether or not to show the legend (optional)|
|`strokeColor`   |The outline of a non-hovered segment (optional)|
|`hoverColor`    |The outline of a hovered segment (optional)|
|`donut`         |Show as a donut chart (optional)|
|`donutThickness`|Thickness of the donut chart as a percentage of the radius (optional)|


## Bar Chart
### Usage:
```javascript
<BarChart 
    data={
    [
        {name: "USA", amount: 101},
        {name:"Netherlands", amount: 56.5},
        {name:"South Africa", amount: 23.2555},
        {name:"Maldives", amount: 3},
        {name:"Belgium", amount: 45.76}
    ]}
    legend={true}
    height={200}
/>
```

### Props:
|Name          |Description         |
|--------------|--------------------|
|`data`        |The data set, consisting of `name`, `amount` and an optional `color` (required)|
|`height`      |The max height of the chart in pixels (required)|
|`legend`      |Whether or not to show the legend (optional)|

## Line/Area Chart
### Usage:
```javascript
<LineChart 
    data={
    [
        {name: "USA", points: [151,105,97,100,96]},
        {name:"Netherlands", points: [65,51,62,75,35]},
        {name:"South Africa", points: [42,32,54,67,23]},
        {name:"Belgium", points: [32,46,12,48,23]},
        {name:"Maldives", points: [25,12,5,3,37]}
    ]}
    legend={true}
    height={200}
    width={400}
    fillArea={false}
/>
```

### Props:
|Name          |Description         |
|--------------|--------------------|
|`data`        |The data set, consisting of `name`, `amount` and an optional `color` (required)|
|`height`      |The max height of the chart in pixels (required)|
|`width`       |The max width of the chart in pixels (optional)|
|`legend`      |Whether or not to show the legend (optional)|
|`fillArea`    |Whether or not to use a fill chart (optional)|