var myScheduleTemplate = `
<div class="tab-pane fade show active" id="myschedule" role="tabpanel" aria-labelledby="myschedule-tab">

  {{if (likes.length > 0)}}

    <button class="btn btn-secondary my-2" onclick="window.print()">Print</button>
    <small class="text-muted form-text">Print to paper or select PDF as the printer to save it as a file you can share with friends.</small>

    {{each(options.days)}}
      {{if(@this.haveSessions)}}
        <p class="my-schedule-date mt-3">{{@this.date}}</p>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Start</th>
                <th>End</th>
                <th>Room</th>
                <th>Session</th>
              </tr>
            </thead>
            <tbody>
            {{each(@this.sessions)}}
              {{if(@this.like)}}
                <tr>
                  <td>{{@this.start}}</td>
                  <td>{{@this.end}}</td>
                  <td>
                    <span class="anchor" title="Click for map" onclick="$('#eventTitle').text('Locate Room {{@this.room}}'); $('#location-arrow').attr('class', ''); $('#location-arrow').attr('class','room _{{@this.room}}'); $('#eventMap').modal({});">{{@this.room}} <i class="fa fa-map-marker"></i></span>
                  </td>
                  <td>{{@this.session}} - {{@this.title}}<br>{{@this.presenter}}</td>
                </tr>
              {{/if}}
            {{/each}}
            </tbody>
          </table>
        </div>
      {{/if}}
    {{/each}}
  {{#else}}
    <p>
      Browse the schedule for each day and like <span style="color: #662e92;font-size:2em;position: relative;top: 5px;">&hearts;</span> sessions that interest you.
      Then return here to <i>My Schedule</i> to view, print, and share with friends you may want to attend with.
    </p>
    <div class="">
      <img src="audience.jpg" class="img-fluid" />
    </div>
  {{/if}}

</div>
`
