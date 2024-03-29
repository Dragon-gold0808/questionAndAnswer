const Page = require("../models/pageModel");

module.exports.addPage = async (req, res, next) => {
    try {
      console.log(req.body);
      const errors = "";
      const {
        
        pagedescription,
      } = req.body;
      
      if (validator.isEmpty(pagedescription)) {
        return res.json({
          errors: "description is required.",
          status: false,
        });
      }
      console.log(errors, req.body);
      const page = await Page.create({
        pagedescription,
      });
      return res.json({ status: true, page });
    } catch (ex) {
      next(ex);
    }
  };

//   module.exports.getPages = async (req, res, next) => {
//     try {
//       const pages = await Page.find({}).sort({date: -1});
//       return res.json(pages);
//     } catch (ex) {
//       next(ex);
//     }
//   };
  
  module.exports.getPage = async (req, res) => {
    try {
      const { id } = req.params;
      const page = await Page.findById(id);
      return res.json(page);
    } catch (e) {
      throw e;
    }
  };
  
  module.exports.page_update = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(req.body);
      const page = await Page.findByIdAndUpdate(id, req.body);
      return res.json(page);
    } catch (e) {
      throw e;
    }
  };