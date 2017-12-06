import {
    Component,
    OnInit,
    SecurityContext,
    ChangeDetectorRef
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { PusherService } from '../pusher/pusher.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'realtime-resume',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
    ngrok: string = environment.ngrok_url;
    resumeHTML: string;
    commits: any[];

    constructor (
        private pusherService: PusherService,
        private sanitizer: DomSanitizer,
        private ref: ChangeDetectorRef,
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.bindToChannel();
        this.http.get(this.ngrok).subscribe(data => {
            this.resumeHTML = data['resume'];
            var commits = data['commits'] as any[];
            if (commits.length !== 0) {
                this.commits = JSON.parse(data['commits']) as any[];
            } else {

            }
            this.ref.detectChanges();
        });
    }

    private bindToChannel() {
        var self = this;
        this.pusherService.resumeChannel.bind(environment.pusher.event, function(resume) {
            self.resumeHTML = resume['html'];
            self.commits = JSON.parse(resume['commits']) as any[];
            self.ref.detectChanges();
        });
    }
}
