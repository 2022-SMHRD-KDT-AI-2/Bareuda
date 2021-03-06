package com.example.bareuda.controller;

import com.example.bareuda.dto.Detail;
import com.example.bareuda.dto.MemberForm;
import com.example.bareuda.entity.Member;
import com.example.bareuda.entity.Product;
import com.example.bareuda.mapper.MemberMapper;
import com.example.bareuda.service.MemberServiceImpl;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;
@Slf4j
@Controller
public class MemberController {
    @Autowired
    private MemberMapper memberMapper;
    @Autowired
    private MemberServiceImpl memberServiceImpl;

    @RequestMapping("/memberList.do")
    public String boardList(Model model){
        List<Member> list = memberMapper.memberList();

        model.addAttribute("list", list);
        return "memberList";
    }
    @GetMapping("/member/createForm")
    public String newMemberForm(){
        return "memberInsert";
    }

    @GetMapping("/")
    public String index(){
        return "index";
    } // 임시


    @RequestMapping("/member/create")
    public String memberInsert(MemberForm form, HttpSession session){
        Member member = form.toEntity();
        memberServiceImpl.memberInsert(member);
        session.setAttribute("sessionMember", member);
        return "redirect:/baumann/testForm"; // 바꾸기. 회원가입 성공화면. (바우만 테스트)
    }

    @GetMapping("/member/loginForm")
    public String memberLoginForm(){
        return "memberLogin";
    }
    @RequestMapping("/member/login")
    public String memberLogin(Model model, MemberForm form, HttpSession session){
        Member member = form.toLogin();
        Member login_member = memberServiceImpl.memberLogin(member);
        if(login_member != null){
            session.setAttribute("sessionMember", login_member);
            return "index"; // 바꾸기. 로그인 성공. (메인페이지로)
        }else{
            return "redirect:/member/loginForm";
        }
    }
    @RequestMapping("/member/logout")
    public String memberLogout(Model model, MemberForm form, HttpSession session){
        session.invalidate();
        return "index";
    }
    @GetMapping("/mypage/removeForm")
    public String memberRemoveForm(){
        return "memberRemove";
    }

    @RequestMapping("/mypage/remove")
    public String memberRemove(Model model, MemberForm form, HttpSession session){
        Member member = form.toLogin();
        int isRemoved = memberServiceImpl.memberRemove(member);
        System.out.println("isRemoved:"+isRemoved);
        if (isRemoved == 1){
            // 성공
            session.invalidate();
            return "index";
        }else {
            // 비번 다름
            return "redirect:/mypage/removeForm";
        }
    }
    @RequestMapping("/member/idCheck.do")
    public String idCheck(Model model, HttpSession session, String mb_id, HttpServletResponse response) throws IOException {
        JSONObject obj = new JSONObject();
        Gson gson = new Gson();
        log.info("mb_id:"+mb_id);
        int idCheck = memberServiceImpl.idCheck(mb_id);
        obj.put("idCheck",idCheck);
        log.info("체크 : "+idCheck);
        response.setContentType("application/x-json; charset=UTF-8");
        response.getWriter().print(obj);

        return null;
    }
}
