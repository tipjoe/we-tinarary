var dayTabTemplate = `
{{if(options.id === "1")}}
  <div class="tab-pane fade" id="day{{id}}" role="tabpanel" aria-labelledby="day{{id}}-tab">
{{#else}}
  <div class="tab-pane fade" id="day{{id}}" role="tabpanel" aria-labelledby="day{{id}}-tab">
{{/if}}
    <p class="my-3">{{date}}</p>

    {{if(options.sessions.length > 0)}}
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Start</th>
            <th>End</th>
            <th>Session</th>
            <th>Presenter(s)</th>
          </tr>
        </thead>
        <tbody id="day{{id}}">
            {{each(options.sessions)}}
              <tr class="main">
                <td>{{@this.start}}</td>
                <td>{{@this.end}}</td>
                <td class="bold">{{@this.session}} - {{@this.title}}</td>
                <td class="bold">{{@this.presenter}}</td>
              </tr>
              <tr>
                {{if(@this.like === true)}}
                  <td rowspan="4"><span class="heart like" id="heart{{@this.id}}" title="Like this session to add it to your schedule" onclick="toggleHeart({{@this.id}}, '#heart{{@this.id}}')">&hearts;</span></td>
                {{#else}}
                  <td rowspan="4"><span class="heart" id="heart{{@this.id}}" title="Like this session to add it to your schedule" onclick="toggleHeart({{@this.id}}, '#heart{{@this.id}}')">&hearts;</span></td>
                {{/if}}
                <td class="label">Description:</td>
                <td colspan="2">
                  <p id="desc{{@this.id}}short">{{@this.description | newlineToBreak | summary}} <span class="moreless" onclick="$('#desc{{@this.id}}short').hide();$('#desc{{@this.id}}long').show();">More</span></p>
                  <p id="desc{{@this.id}}long" style="display:none;">{{@this.description | newlineToBreak}} <span class="moreless" onclick="$('#desc{{@this.id}}long').hide();$('#desc{{@this.id}}short').show();">Less</span></p>
                </td>
              </tr>
              <tr>
                <td class="label">Bio(s):</td>
                <td colspan="2">
                  <p id="bio{{@this.id}}short">{{@this.bio | newlineToBreak | summary}} <span class="moreless" onclick="$('#bio{{@this.id}}short').hide();$('#bio{{@this.id}}long').show();">More</span></p>
                  <p id="bio{{@this.id}}long" style="display:none;">{{@this.bio | newlineToBreak}} <span class="moreless" onclick="$('#bio{{@this.id}}long').hide();$('#bio{{@this.id}}short').show();">Less</span></p>
                </td>
              </tr>
              {{if(@this.room)}}
              <tr>
                <td class="label">Room:</td>
                <td colspan="2">
                  <span class="anchor" title="Click for map" onclick="$('#eventTitle').text('Locate Room {{@this.room}}'); $('#location-arrow').attr('class', ''); $('#location-arrow').attr('class','room _{{@this.room}}'); $('#eventMap').modal({});">{{@this.room}} <i class="fa fa-map-marker"></i></span>
                </td>
              </tr>
              {{#else}}
                <tr style="visibility:collapse;"><td></td><td colspan="2"></td></tr>
              {{/if}}
              {{if(@this.moderator)}}
              <tr>
                <td class="label">Moderator:</td>
                <td colspan="2">
                  {{@this.moderator}}
                </td>
              </tr>
              {{#else}}
                <tr style="visibility:collapse;"><td></td><td colspan="2"></td></tr>
              {{/if}}

            {{/each}}
        </tbody>
      </table>
    </div>
    {{#else}}
      No sessions scheduled for this day.
    {{/if}}
  </div>
`
