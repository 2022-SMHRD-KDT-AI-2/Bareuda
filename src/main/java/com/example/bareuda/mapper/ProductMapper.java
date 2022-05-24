package com.example.bareuda.mapper;

import com.example.bareuda.entity.Answer;
import com.example.bareuda.entity.Like;
import com.example.bareuda.entity.Product;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface ProductMapper {
    public List<Product> getRecommended(@Param("type1") String type1, @Param("type2") String type2, @Param("type3") String type3, @Param("type4") String type4);
    public List<Product> getRecommendedCategory(@Param("type1") String type1, @Param("type2") String type2, @Param("type3") String type3, @Param("type4") String type4, @Param("category") String category);

    public Like selectLike(Like like);
    public void deleteLike(Like like);
    public void insertLike(Like like);
    public List<Product> getlikeList(String mb_id);
    public List<Product> autocomplete(String search);
    public Product findProductById(int p_id);


}
