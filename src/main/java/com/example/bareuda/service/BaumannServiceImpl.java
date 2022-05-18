package com.example.bareuda.service;

import com.example.bareuda.dto.BaumannTestForm;
import com.example.bareuda.entity.Answer;
import com.example.bareuda.entity.Member;
import com.example.bareuda.entity.Result;
import com.example.bareuda.mapper.BaumannMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Slf4j
@Service
public class BaumannServiceImpl implements BaumannService{
    @Autowired
    private BaumannMapper baumannMapper;

    @Override
    public void createBaumannResult(Member member, BaumannTestForm form) {
        int[] scores = new int[4];

        for(int i=0; i<form.getPart1().length; i++){
            scores[0] += form.getPart1()[i];
        }
        for(int i=0; i<form.getPart2().length; i++){
            scores[1] += form.getPart2()[i];
        }
        for(int i=0; i<form.getPart3().length; i++){
            scores[2] += form.getPart3()[i];
        }
        for(int i=0; i<form.getPart4().length; i++) {
            scores[3] += form.getPart4()[i];
        }

        String type = "";
        // part1
        if(scores[0] <= 26){
            type += 'D';
        }else{
            type += 'O';
        }

        // part2
        if(scores[1] <= 29){
            type += 'R';
        }else{
            type += 'S';
        }

        // part3
        if(scores[2] <= 30){
            type += 'N';
        }else{
            type += 'P';
        }

        // part4
        if(scores[3] <= 40){
            type += 'T';
        }else{
            type += 'W';
        }
        Answer answer = new Answer(0, scores[0], scores[1], scores[2], scores[3], member.getMb_id(), type);
        log.info(member.getMb_id()+" 계정에 들어가는 answer = "+answer.toString());
        baumannMapper.baumannScoreInsert(answer);
    }

    @Override
    public Result getBaumannResult(Member member) {
        String mb_id = member.getMb_id();
        Answer answer = baumannMapper.findById(mb_id);
        Result result = baumannMapper.getResult(answer);
        return result;
    }

    @Override
    public Answer getAnswer(String mb_id) {
        Answer answer = baumannMapper.findById(mb_id);
        return answer;
    }

}
