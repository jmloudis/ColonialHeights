package com.loudis.colonielheightsshop.controller;

import com.loudis.colonielheightsshop.dao.ProductCategoryRepository;
import com.loudis.colonielheightsshop.dao.ProductRepository;
import com.loudis.colonielheightsshop.entity.Product;
import com.loudis.colonielheightsshop.entity.ProductCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController
{

    private ProductRepository productRepository;

    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    public AdminController(ProductRepository productRepository, ProductCategoryRepository productCategoryRepository) {
        this.productRepository = productRepository;
        this.productCategoryRepository = productCategoryRepository;
    }


    @PostMapping("/category/{id}/add-product")
    public Product addProduct(@PathVariable("id") Long id, @RequestBody Product product)
    {
        ProductCategory category = this.productCategoryRepository.getById(id);
        product.setCategory(category);
        return this.productRepository.save(product);
    }

    @DeleteMapping("/product/{id}")
    public void deleteProduct(@PathVariable("id") Long id)
    {
        this.productRepository.deleteById(id);
        System.out.println("Product " + id + " has been deleted");
    }

}
