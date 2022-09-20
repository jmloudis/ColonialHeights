package com.loudis.colonielheightsshop.dao;

import com.loudis.colonielheightsshop.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
@CrossOrigin(origins = "http://localhost:4200")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long>
{

}
