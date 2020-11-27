import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/shared/model/feedback.model';
import { Paging } from 'src/app/shared/model/paging.model';
import { FeedbackService } from 'src/app/shared/service/feedback.service';
import { Vote } from 'src/app/shared/vote.model';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedbackWithPaging=new Paging();
  searchParam="";

  constructor(private feedbackService:FeedbackService) { }


  ngOnInit(): void {
      this.feedbackWithPaging.currentPage=1;
      this.getAllFeedBackWithPaging(1,5,this.searchParam);
  }

  getAllFeedBackWithPaging(page,size,searchParam){
    this.feedbackService.getAllFeedBackWithPaging(page,size,searchParam).then(res=>{
      this.feedbackWithPaging=res as Paging;
    })
  }

  PreviousAndNextPage(totalPage,page,size,searchParam){
    if(page>0 && page<=totalPage){
      this.getAllFeedBackWithPaging(page,size,searchParam);
    }
  }

  insertVote(isLiked:boolean,commentId:number){
      let vt=new Vote();
      vt.CommentId=commentId;
      vt.IsLiked=isLiked;
      this.feedbackService.insertVote(vt).then(res=>{
        this.getAllFeedBackWithPaging(1,5,this.searchParam);
   
      })

  }

  onSearchChange(searchParam){
    this.searchParam=searchParam;
    this.getAllFeedBackWithPaging(1,5,this.searchParam);
  }

}
