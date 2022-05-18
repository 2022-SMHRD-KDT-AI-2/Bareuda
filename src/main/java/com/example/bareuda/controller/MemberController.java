package com.example.bareuda.controller;

import com.example.bareuda.dto.BaumannTestForm;
import com.example.bareuda.dto.MemberForm;
import com.example.bareuda.entity.Answer;
import com.example.bareuda.entity.Member;
import com.example.bareuda.mapper.MemberMapper;
import com.example.bareuda.service.MemberServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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
    @GetMapping("/member/new")
    public String newMemberForm(){
        return "memberInsert";
    }


    @RequestMapping("/member/create")
    public String memberInsert(MemberForm form){
        Member member = form.toEntity();
        memberServiceImpl.memberInsert(member);
        return "redirect:/member/loginForm"; // 바꾸기. 회원가입 성공화면. (바우만 테스트)
    }

    @GetMapping("/member/loginForm")
    public String memberLoginForm(){
        return "memberLogin";
    }
    @RequestMapping("/member/login")
    public String memberLogin(Model model, MemberForm form, HttpSession session){
        model.addAttribute("name", "도연");
        log.info(form.toString());
        Member member = form.toLogin();
        int isMember = memberMapper.memberLogin(member);
        if(isMember == 1){
            String mb_id = member.getMb_id();
            Member login_member = memberMapper.findById(mb_id);
            log.info(login_member.toString());
            session.setAttribute("sessionMember", login_member);
            return "index"; // 바꾸기. 로그인 성공. (메인페이지로)
        }else{
            //return "redirect:/member/loginForm"; // 바꾸기. 로그인 실패화면. (로그인 화면 그대로)
            return "index";
        }
    }

    @GetMapping("/member/baumannTestForm")
    public String baumannTestForm(){
        return "baumannTest";
    } // 바우만 테스트 폼
    @RequestMapping("/member/baumannTest")
    public void baumannTest(BaumannTestForm form, HttpServletRequest request){
        HttpSession session=request.getSession();
        Member member = (Member)session.getAttribute("member");
        int[] scores = form.calScore();
        String type = form.getType(scores);
        System.out.println("점수:"+scores+"// tostring:"+form.toString());
        Answer answer = new Answer(scores[0], scores[1], scores[2], scores[3], member.getMb_id(), type);
        memberMapper.baumannScoreInsert(answer);
        // 바꾸기. return 타입 string으로. 바우만 테스트 결과 페이지로.
        // return "redirect:/baumannResult.do";
    }


}
