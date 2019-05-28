'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EstoqueSchema extends Schema {
  up () {
    this.create('estoques', (table) => {
      table.increments()
      table.timestamps()
      table.integer('total')
    })
  }

  down () {
    this.drop('estoques')
  }
}

module.exports = EstoqueSchema
