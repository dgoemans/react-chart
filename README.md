# react-chart
A simple React chart library

## Contents:
Supports the following chart(s):
* PieChart

## PieChart
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
/>
```

### Props:
|Name          |Description         |
|--------------|--------------------|
|`data`        |The data set, consisting of `name`, `amount` (value between 0 and 1) and an optional `color` (required)|
|`size`        |The size of the chart in pixels (required)|
|`legend`      |Whether or not to show the legend (optional)|
|`strokeColor` |The outline of a non-hovered segment (optional)|
|`hoverColor`  |The outline of a hovered segment (optional)|
