package com.example.bareuda.controller;

import com.example.bareuda.dto.CategoryForm;
import com.example.bareuda.entity.Answer;
import com.example.bareuda.entity.Like;
import com.example.bareuda.entity.Member;
import com.example.bareuda.entity.Product;
import com.example.bareuda.service.BaumannServiceImpl;
import com.example.bareuda.service.ProductServiceImpl;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@Slf4j
@Controller
public class ProductController {
    @Autowired
    private ProductServiceImpl productServiceImpl;
    @Autowired
    private BaumannServiceImpl baumannService;

    @RequestMapping("/product/recommended")
    public String getRecommended(Model model, HttpSession session){
        Member member = (Member) session.getAttribute("sessionMember");
        List<Product> products = productServiceImpl.getRecommended(member);
        Answer answer = baumannService.findById(member.getMb_id());
        model.addAttribute("answer", answer);
        model.addAttribute("products", products);
        return "recommended";
    }

    @RequestMapping("/product/category.do")
    public String productsTest(Model model, HttpSession session, CategoryForm form, HttpServletResponse response) throws IOException {
        Member member = (Member) session.getAttribute("sessionMember");
        JSONObject obj = new JSONObject();
        Gson gson = new Gson();
        String category = form.getCategory();
        log.info("selected category : "+category);
        List<Product> products;
        String jsonProducts;
        if(category==""){ // 카테고리 - 전체보기
            products = productServiceImpl.getRecommended(member);
            jsonProducts = gson.toJson(products);
            obj.put("products",jsonProducts);
        }else{ // 카테고리별 보기
            products = productServiceImpl.getRecommendedCategory(member, category);
            jsonProducts = gson.toJson(products);
            obj.put("products", jsonProducts);
        }
        obj.put("category", category);

        response.setContentType("application/x-json; charset=UTF-8");
        response.getWriter().print(obj);

        return null;
    }

    @RequestMapping("/product/like.do")
    public String productLike(Model model, HttpSession session, int p_id, HttpServletResponse response) throws IOException {
        Member member = (Member) session.getAttribute("sessionMember");
        JSONObject obj = new JSONObject();
        Like like = new Like(0, member.getMb_id(), p_id);
        productServiceImpl.productLike(like);
        obj.put("p_id",p_id);

        response.setContentType("application/x-json; charset=UTF-8");
        response.getWriter().print(obj);

        return null;
    }

    @RequestMapping("/mypage/likeList")
    public String productLikeList(Model model, HttpSession session) throws IOException {
        Member member = (Member) session.getAttribute("sessionMember");
        List<Product> list = productServiceImpl.getlikeList(member.getMb_id());
        model.addAttribute("list", list);
        return "likeProducts";
    }

    @RequestMapping("/product/search.do")
    public String productsSearch(Model model, HttpSession session, String search, HttpServletResponse response) throws IOException {
        Member member = (Member) session.getAttribute("sessionMember");
        JSONObject obj = new JSONObject();
        Gson gson = new Gson();

        List<Product> list = productServiceImpl.autocomplete(search);

        String products = gson.toJson(list);
        obj.put("products",products);

        response.setContentType("application/x-json; charset=UTF-8");
        response.getWriter().print(obj);

        return null;
    }

    @RequestMapping("/product/comparison")
    public String productComparison(Model model, HttpSession session, String search, HttpServletResponse response) throws IOException {
        Member member = (Member) session.getAttribute("sessionMember");

        return "productComparison";
    }
}

