var express = require('express');
var router = express.Router();
var novedadesModel = require('./../../models/novedadesModel');


/* GET home page. */
router.get('/', async function(req, res, next) {

  var novedades = await novedadesModel.getNovedades();

  res.render('admin/novedades', {
    layout: 'admin/layout',
    usuario: req.session.nombre,
    novedades 
   });
});

/** Insertar novedades */
router.get('/agregar', (req,res,next) => {
  res.render('admin/agregar', {
    layout: 'admin/layout'
  });
});

router.post('/agregar', async(req,res,next)=>{
  try{
    if (req.body.titulo != "" && req.body.link != "" ){
      await novedadesModel.insertNovedad(req.body);
      res.redirect('/admin/novedades')
    } else{
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true, message: 'Debe completar todos los campos'
      })
    }
  } catch (error) {
    console.log(error)
    res.render('admin/agregar',{
      layout: 'admin/layout',
      error: true, message: 'No se pudo cargar la novedad'
    })
  }
});

/** Delete Novedades  */
router.get('/eliminar/:id', async(req,res,next)=>{
  var id = req.params.id;
  await novedadesModel.deleteNovedadById(id);
  res.redirect('/admin/novedades')
});

/** update novedades get novedad */
router.get('/modificar/:id', async(req,res,next)=>{
  var id = req.params.id;
  //console.log(req.params.id);
  var novedad = await novedadesModel.getNovedadesById(id);
  
  res.render('admin/modificar', {
    layout: 'admin/layout', 
    novedad
  });
});

/**update novedades update novedad */
router.post('/modificar', async(req,res,next)=>{
  try{
    var obj = {
      titulo: req.body.titulo,
      link: req.body.link
    }
    //console.log(obj)
    

    await novedadesModel.modificarNovedadesById(obj, req.body.id);
    res.redirect('/admin/novedades');
  }catch(error){
    console.log(error)
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true, 
      message: "No se pudo modificar la novedad"
    })
  }
})


module.exports = router;