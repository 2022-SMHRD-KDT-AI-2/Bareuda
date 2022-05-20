package com.example.bareuda.controller;

import com.example.bareuda.dto.TestForm;
import com.example.bareuda.entity.Member;
import com.example.bareuda.entity.Product;
import com.example.bareuda.service.ProductServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.net.http.HttpResponse;
import java.util.List;

@Slf4j
@Controller
public class ProductController {
    @Autowired
    private ProductServiceImpl productServiceImpl;

    @RequestMapping("/product/recommended.do")
    public String getRecommended(Model model, HttpSession session){
        Member member = (Member) session.getAttribute("sessionMember");
        List<Product> products = productServiceImpl.getRecommended(member);

        model.addAttribute("products", products);
        return "recommended";
    }

//    @RequestMapping("/product/recommended/category.do")
//    public String getRecommendedCategory(Model model, HttpSession session){
//        Member member = (Member) session.getAttribute("sessionMember");
//        String category = (String) model.getAttribute("category");
//        List<Product> products = productServiceImpl.getRecommendedCategory(member, category);
//
//        model.addAttribute("products", products);
//        return null;
//    }

    @RequestMapping("/product/test.do")
    public String productsTest(Model model, HttpSession session, TestForm form, HttpServletResponse response) throws IOException {
        Member member = (Member) session.getAttribute("sessionMember");
        JSONObject obj = new JSONObject();
        String category = form.getCategory();
        System.out.println("category:"+category);
        Product product = new Product(3, "dd", "dd", "dd", "dd", "dd", "dd", "dd",  "dd", "dd", "dd", "dd", "dd", 3);
        if(category==""){
            obj.put("like",111);
        }else{
            obj.put("like",222);
            model.addAttribute("products", product);
        }

        response.setContentType("application/x-json; charset=UTF-8");
        response.getWriter().print(obj);

        return null;
    }
}
