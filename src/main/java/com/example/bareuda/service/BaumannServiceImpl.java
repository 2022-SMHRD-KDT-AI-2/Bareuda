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
        int part_num = Integer.parseInt(form.getPart_num());
        if(part_num == 1){
            if (baumannMapper.findById(member.getMb_id()) == null)
                baumannMapper.createAnswer(member.getMb_id());
        }
        int score = 0;

        for(int i=0; i<form.getPart().length; i++){
            score += form.getPart()[i];
        }

        char type;

        int[] parts = {26, 29, 30, 40};
        char[] types1 = {'D', 'R', 'N', 'T'};
        char[] types2 = {'O', 'S', 'P', 'W'};

        // part
        if(score <= parts[part_num-1]){
            type = types1[part_num-1];
        }else{
            type = types2[part_num-1];
        }
        Answer answer = baumannMapper.findById(member.getMb_id());
        StringBuilder builder = new StringBuilder(answer.getMb_result());
        if(part_num==1){
            answer.setA_part1(score);
        }else if(part_num==2){
            answer.setA_part2(score);
        }else if(part_num==3){
            answer.setA_part3(score);
        }else{
            answer.setA_part4(score);
        }
        builder.setCharAt(part_num-1, type);
        answer.setMb_result(builder.toString());
        log.info("answer : "+answer.toString());
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

    @Override
    public Answer findById(String mb_id) {
        Answer answer = baumannMapper.findById(mb_id);
        return answer;
    }

}
