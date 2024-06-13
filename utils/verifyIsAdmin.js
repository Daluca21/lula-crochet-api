const UsuarioService = require("../services/UsuarioService");
const usuarioService = new UsuarioService();

const verifyIsAdmin = async (correo) => {
  const usuario = usuarioService.findOne(correo);
  return usuario.getRol().getId() === 1;
};


module.exports = { verifyIsAdmin };