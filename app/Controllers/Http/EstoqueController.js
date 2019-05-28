'use strict'

const Estoque = use('App/Models/Estoque')

class EstoqueController {

  async show({ params }) {
    const { id } = params;
    const estoque = await Estoque.find(id);

    return estoque;
  }

  async create({ request, response }) {
    const estoque = await Estoque.findOrCreate({ id: 1 }, { total: 10 });
    return estoque;
  }

  async add({ request, response, params }) {
    const { value } = request.get();
    const { id } = params;
    const estoque = await Estoque.find(id);

    if (value) {
      estoque.total += +value;
      await estoque.save()
    }

    return { estoque }
  }

  async remove({ request, params }) {
    const { value } = request.get();
    const { id } = params;
    const estoque = await Estoque.find(id);

    if (value) {
      estoque.total -= +value;
      await estoque.save()
    }

    return { estoque }
  }

}

module.exports = EstoqueController
