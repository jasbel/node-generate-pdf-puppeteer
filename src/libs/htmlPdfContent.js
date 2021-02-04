/** Plantilla para generar el archivo PDF
 * 
 */

/** Datos por defecto de Chart */
const defaultDataChart = {
    title: "Titulo por Defecto",
    dataX : [12, 14, 16, 18, 20, 22],
    dataY : [10, 9, 15, 5, 22, 2],
    difY: 4,
    stepY : 5,
    titleGraphic : '',
    titleLegend : 'Titulo de Leyenda',
    bgColor : 'rgba(66, 134, 244, 1)',
    borderColor : 'rgba(4, 10, 50, 1)',
    borderWidth : 4
}

/** Funcion que devuelve el valor maximo de un conjunto de valores */
const maxArrayValue = (dataArr) => {
    const maxValue = Math.max.apply(null, dataArr);
    console.log("Max Value: ", maxValue);
    return maxValue;
}

/** Funcion que devuelve el valor minimo de un conjunto de valores */
const minArrayValue = (dataArr) => {
    const minValue = Math.min.apply(null, dataArr);
    console.log("Min Value: ", minValue);
    return minValue;
}

/** Contenido del template del PDF */
const htmlContentForPDF = (dataChart) => {
    // Valores por defecto
    const {
        title: _title,
        dataX: _dataX,
        dataY: _dataY,
        difY: _difY,
        stepY: _stepY,
        titleGraphic: _titleGraphic,
        titleLegend: _titleLegend,
        bgColor: _bgColor,
        borderColor: _borderColor,
        borderWidth: _borderWidth,
    } = defaultDataChart;

    // Valores del Chart
    const {
        title = _title,
        dataX = _dataX,
        dataY = _dataY,
        difY = _difY,
        stepY = _stepY,
        titleGraphic = _titleGraphic,
        titleLegend = _titleLegend,
        bgColor = _bgColor,
        borderColor = _borderColor,
        borderWidth = _borderWidth
    } = dataChart;

    const maxValue = maxArrayValue(dataY);
    const minValue = minArrayValue(dataY);

    const minY = maxValue + difY;
    const maxY = minValue - difY;

    const stylesCDN = /* html */`
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    `
    const styles = /* css */`

        table,
        td {
            border: 1px solid #333;
        }

        thead,
        tfoot {
            background-color: #0e0d0d;
            color: rgb(221, 209, 209);
        }
        .table thead th,
        .table tbody td {
            text-align: center;
        }
        .txt--center {
            text-align: center;
        }
        .w-100 {
            width: 100%;
        }
        .container {
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        }
    `;

    let dataXY = [];
    const concatDataTable = (accumulator, currentValue) => accumulator +
    `<tr>
        <td>${currentValue[0]}</td>
        <td>${currentValue[1]}</td>
    </tr>
    `;
    if (dataX.length === dataY.length) {
        for (const i in dataX) {
            dataXY[i] = [ dataX[i], dataY[i] ];
        }
    };
    const valuesHtmlDataTable =  dataXY.reduce(concatDataTable, '');

    const mainHTML = /* html */ `
        <div class="container">
            <h1 class="txt--center"> ${ title }</h1>
            <br>
            <canvas id='myChart' width='800' height='450'></canvas>

            <br>
            <p> <strong>MaxValue: </strong> ${ maxValue } </p>
            <p> <strong>MaxValue: </strong> ${ minValue } </p>
        </div>

        <br>

        <table class="table w-100">
            <thead>
                <tr>
                    <th colspan="1">Data 1</th>
                    <th colspan="1">Data 2</th>
                </tr>
            </thead>
            <tbody>
                ${valuesHtmlDataTable}
            </tbody>
        </table>
    `

    const scriptCDN = /* html */ `
        <script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js'></script>
    `;

    const scriptData = /* html */ `
        const dataX     =  [${dataX}];
        const dataY     =  [${dataY}];
        const minY  =  ${minY};
        const maxY  =  ${maxY};
        const stepY     =  ${stepY};
        const titleGraphic  =  "${titleGraphic}";
        const titleLegend   =  "${titleLegend}";
        const bgColor   =  "${bgColor}";
        const borderColor   =  "${borderColor}";
        const borderWidth   =  ${borderWidth};
    `

    const scriptChart = /* javascript */ `
        const d =  document;
        const ctx = d.getElementById("myChart").getContext("2d");

        ${scriptData}

        const myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: dataX,
                datasets: [{
                    label: titleLegend,
                    data: dataY,
                    backgroundColor: bgColor,
                    borderColor: borderColor,
                    borderWidth: borderWidth,
                }]
            },
            options: {
                title: {
                    display: true,
                    text: titleGraphic,
                    fontSize: 20
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        // fontColor: 'red',
                        fontSize: 14,
                        fontStyle: 700
                    }
                },
                /* Grafica que empieza desde y=0 */
                scales: {
                    yAxes:[{
                        ticks: {
                            // beginAtZero: true,
                            suggestedMin: minY,
                            suggestedMax: maxY,
                            stepSize: stepY,
                            callback: function(value, index, values) {
                                return  value + ' Q';
                            }
                        }
                    }],
                    xAxes:[{
                        ticks: {
                            callback: function(value, index, values) {
                                return  value + ' min';
                            }
                        }
                    }]
                },
                elements: {
                    line: {
                        tension: 0,
                    }
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                },
                /* Animation */
                animation: {
                    duration: false,
                },
                hover: {
                    animationDuration: 0,
                },
                responsiveAnimationDuration: 0,
            }
        })
    `

    return /* html */ `
        ${stylesCDN}
        <style>
            ${styles}
        </style>

        ${mainHTML}

        ${scriptCDN}
        <script>
            ${scriptChart}
        </script>

    `;
};

module.exports = htmlContentForPDF;