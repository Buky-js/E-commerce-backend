const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try{
    const categoriesData = await Category.findAll({
       // be sure to include its associated Products
      include: [{model: Product, attributes: ['product_name', 'price', 'stock']}]
    });
    res.status(200).json(categoriesData);
  } catch (err){
    res.status(500).json(err);
  }
 
});

router.get('/:id', async (req, res) => {
 try{
  const categoriesData = await Category.findByPk(req.params.id, {
// be sure to include its associated Products
  include: [{model: Product, attributes: ['product_name', 'price', 'stock']}]
  });
  if(!categoriesData){
    res.status(404).json({message: 'No category found with that id'});
    return;
  }
  res.status(200).json(categoriesData);
 } catch(err){
  res.status(500).json(err);
 }
})

//   try{
//  // find one category by its `id` value
//  const categoriesData = await Category.findByPk(req.param.id, {
//   
// });
//   }

  
// });

router.post('/', async (req, res) => {
  try{
     // create a new category
    const categoriesData = await Category.create(req.body);
    res.status(200).json(categoriesData);
  } catch(err){
    res.status(400).json(err);
  }
 
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try{
    const categoriesData = await Category.update({
      category_name: req.body.category_name
    },
    {
      where: {
        id:req.params.id
      }
    });
    if(!categoriesData){
      res.status(404).json({message: 'No category found with that id'});
      return;
    }
    res.status(200).json(categoriesData);
  }catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try{
    const categoriesData = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });
    if(!categoriesData){
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(readerData);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
