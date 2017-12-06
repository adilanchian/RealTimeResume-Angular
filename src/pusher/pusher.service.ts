declare const Pusher: any;

import { environment } from '../environments/environment';

export class PusherService {
  pusher: any;
  resumeChannel: any;

  constructor() {
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      encrypted: environment.pusher.encrypted
    });

    this.resumeChannel = this.pusher.subscribe(environment.pusher.channel);
  }
}
