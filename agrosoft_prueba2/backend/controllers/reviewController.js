const Review = require('../models/review');
const User = require('../models/user');
const Product = require('../models/product');

exports.createReview = async (req, res) => {
  const { id_producto, clasificacion, comentario } = req.body;
  try {
    const review = await Review.create({
      id_usuario: req.user.id_usuario,
      id_producto,
      clasificacion,
      comentario,
      fecha_comentario: new Date(),
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviewsByProduct = async (req, res) => {
  const { id_producto } = req.params;
  try {
    const reviews = await Review.findAll({
      where: { id_producto },
      include: [{ model: User, attributes: ['nombre'] }],
      order: [['fecha_comentario', 'DESC']],
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};