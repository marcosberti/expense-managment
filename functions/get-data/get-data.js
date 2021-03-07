const fetch = require('node-fetch')

const query = `
    query MyQuery($f_ini: timestamptz!, $f_end: timestamptz!, $f_curr: timestamptz!) {
        ingresos(where: {created_at: {_gte: $f_ini, _lte: $f_end}}) {
            created_at
            detalle
            monto
            ingresos_tipo {
                tipo
            }
        }
        gastos_variables(where: {created_at: {_gte: $f_ini, _lte: $f_end}}) {
            monto
            detalle
            created_at
            categorias {
                categoria {
                categoria
                }
            }
        }
        gastos_fijos_h {
            detalle
            categorias {
                categoria {
                categoria
                }
            }
            gastos_fijos(where: {fecha_hasta: {_is_null: true}}) {
                monto
            }
        }
        gastos_cuotas(where: {fecha_ultimo_pago: {_gte: $f_curr}}) {
            cant_cuotas
            categorias {
                categoria {
                categoria
                }
            }
            detalle
            monto_total
            fecha_primer_pago
            fecha_ultimo_pago
        }
    }
`

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': 'GET',
}

const handler = async event => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
    }
  }

  const {authorization} = event.headers
  const current = new Date()
  const initial = new Date(current.getFullYear(), current.getMonth())
  const end = new Date(current.getFullYear(), current.getMonth() + 1, 0)

  try {
    const data = await fetch(process.env.HASURA_GRAPHQL_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        query,
        variables: {
          f_ini: initial.toISOString(),
          f_end: end.toISOString(),
          f_curr: current.toISOString(),
        },
      }),
      headers: {
        Authorization: `${authorization}123`,
      },
    }).then(response => response.json())

    if (data.errors) {
      throw data.errors
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (e) {
    const code = e.length && e[0].message.includes('Authentication') ? 401 : 500

    return {
      statusCode: code,
      body: JSON.stringify(e),
    }
  }
}

module.exports = {handler}
