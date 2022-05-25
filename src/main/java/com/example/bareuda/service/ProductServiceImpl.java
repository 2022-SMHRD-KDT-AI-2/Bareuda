package com.example.bareuda.service;

import com.example.bareuda.dto.Detail;
import com.example.bareuda.entity.Answer;
import com.example.bareuda.entity.Like;
import com.example.bareuda.entity.Member;
import com.example.bareuda.entity.Product;
import com.example.bareuda.mapper.BaumannMapper;
import com.example.bareuda.mapper.ProductMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

@Slf4j
@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductMapper productMapper;
    @Autowired
    private BaumannMapper baumannMapper;

    @Override
    public List<Product> getRecommended(Member member) {
        Answer answer = baumannMapper.findById(member.getMb_id());
        String[] types = new String[4];
        String type = answer.getMb_result();
        for(int i=0; i<4; i++){
            types[i] = "%"+type.charAt(i)+"%";
        }
        List<Product> products = productMapper.getRecommended(types[0], types[1], types[2], types[3]);

        return products;
    }

    @Override
    public List<Product> getRecommendedCategory(Member member, String category) {
        Answer answer = baumannMapper.findById(member.getMb_id());
        String[] types = new String[4];
        String type = answer.getMb_result();
        for(int i=0; i<4; i++){
            types[i] = "%"+type.charAt(i)+"%";
        }
        List<Product> products = productMapper.getRecommendedCategory(types[0], types[1], types[2], types[3], category);
        return products;
    }

    @Override
    public void productLike(Like like) {
        if (productMapper.selectLike(like) != null){
            productMapper.deleteLike(like);
        }
        else {
            productMapper.insertLike(like);
        }
    }

    @Override
    public Like isLike(Like like) {
        return productMapper.selectLike(like);
    }

    @Override
    public List<Product> autocomplete(String search) {
        List<Product> list = productMapper.autocomplete(search);
        return list;
    }

    @Override
    public List<Product> getlikeList(String mb_id) {
        List<Product> list = productMapper.getlikeList(mb_id);
        return list;
    }

    @Override
    public Product findById(int p_id) {
        return productMapper.findProductById(p_id);
    }

    @Override
    public Detail getDetail(Product product) {
        String user_type_str = product.getP_usertype();
        String[] user_type1 = user_type_str.split(",");
        int[] user_type2 = new int[5];
        int total = 0;
        for(int i=0; i<5; i++){
            user_type2[i] = Integer.parseInt(user_type1[i].split("-")[1]);
            total += user_type2[i];
        }
        int[] user_type3 = new int[5];
        for(int i=0; i<5; i++){
            user_type3[i] = (user_type2[i]* 100)/total;
        }
        String[] rskin_str = product.getP_rskin().split("%");
        String[] rtrouble_str = product.getP_rtrouble().split("%");
        String[] rsti_str = product.getP_rsti().split("%");
        int[] rskin = new int[3];
        int[] rtrouble = new int[3];
        int[] rsti = new int[3];
        for(int i=0; i<rskin_str.length; i++){
            rskin[i] = Integer.parseInt(rskin_str[i]);
            rtrouble[i] = Integer.parseInt(rtrouble_str[i]);
            rsti[i] = Integer.parseInt(rsti_str[i]);
        }
        Detail detail = new Detail(user_type3[1],user_type3[3],user_type3[2],user_type3[4],user_type3[0],rskin[0],rskin[1],rskin[2],rtrouble[0],rtrouble[1],rtrouble[2],rsti[0],rsti[1],rsti[2]);
        return detail;
    }
}
