const ProductoService = require("../services/ProductoService");
const service = new ProductoService();

const create = async (req, res) => {
  try {
    const response = await service.create(req.body);
    res.json({ success: true, data: response });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const get = async (req, res) => {
  try {
    const response = await service.findComplete();
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const getOfertasById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.getOfertasById(id);
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const getWithOferta = async (req, res) => {
  try {
    const response = await service.findWithOferta();
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const getByCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.findByCategoria(id);
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.findOne(id);
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    console.log(req);
    const response = await service.update(id, body);
    res.json({ success: true, data: response });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const _delete = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.json({ success: true, data: response });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const addToCarrito = async (req, res) => {
  try {
    const response = await service.addToCarrito(req.body);
    res.json({ success: true, data: response });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const removeToCarrito = async (req, res) => {
  try {
    const { correo, id } = req.params;
    const response = await service.removeToCarrito(correo, id);
    res.json({ success: true, data: response });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const getCarrito = async (req, res) => {
  try {
    const { correo } = req.params;
    const response = await service.getCarrito(correo);
    res.json({ success: true, data: response });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = {
  create,
  get,
  getByCategoria,
  getOfertasById,
  getWithOferta,
  getById,
  update,
  _delete,
  addToCarrito,
  removeToCarrito,
  getCarrito
};