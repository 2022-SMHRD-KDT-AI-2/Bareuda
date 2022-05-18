package com.example.bareuda.controller;

import com.example.bareuda.dto.BaumannTestForm;
import com.example.bareuda.entity.Answer;
import com.example.bareuda.entity.Member;
import com.example.bareuda.entity.Result;
import com.example.bareuda.service.BaumannServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Slf4j
@Controller
public class BaumannController {
    @Autowired
    BaumannServiceImpl baumannService;

    @RequestMapping("/baumann/result")
    public String baumannResult(Model model, HttpSession session){
        Member member = (Member)session.getAttribute("sessionMember");
        Result result = baumannService.getBaumannResult(member);
        model.addAttribute("result", result);
        Answer answer = baumannService.getAnswer(member.getMb_id());
        model.addAttribute("answer", answer);
        return "baumannResult";
    }

    @GetMapping("/baumann/testForm")
    public String baumannTestForm(){
        return "baumannTest";
    } // 바우만 테스트 폼
    @RequestMapping("/baumann/test")
    public String baumannTest(BaumannTestForm form, HttpSession session){
        Member member = (Member)session.getAttribute("sessionMember");
        baumannService.createBaumannResult(member, form);
        return "redirect:/baumann/result";
    }
}
