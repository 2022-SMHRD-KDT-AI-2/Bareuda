package com.example.bareuda.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FirstController {

    @GetMapping("/hi")
    public String niceToMeetYou(Model model) {
        model.addAttribute("name", "도연");
        return "memberLogin";
    }

    @GetMapping("/bye")
    public String seeYouNext(Model model) {
        model.addAttribute("name", "도연");
        return "goodbye";
    }
}
