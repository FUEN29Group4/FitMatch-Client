//  預約周曆
//讀取session中存的memberId
const memberIdFromSession = sessionStorage.getItem('memberId');

//const { createApp, ref } = Vue;
const { ref } = Vue;
const MatchCalendar = Vue.createApp({
    data() {
        return {
            gymId: null,
            showCalendar: false,
            events: [] // 用來存儲從外部 API 獲取的事件
        };
    },
    methods: {
        setgym(id) {
            this.gymId = id;
            this.showCalendar = true;
            this.fetchEventsForgym(id); // 獲取場館的事件
            this.initializeCalendar();  // 初始化 FullCalendar

        },
        fetchEventsForgym(gymid) {
            fetch(`https://localhost:7011/api/Reservation/MatchGym/${gymid}`)
                .then(function (response) {
                    console.log(gymid);
                    if (!response.ok) {
                        throw new Error("API請求失敗" + response);
                    }
                    return response.json();
                })
                .then(data => {
                   
                    this.events = data.map(event => {
                        return {
                            title: event.trainers[0].trainerName,
                            start: event.startTime,
                            end: event.endTime,
                            extendedProps: {
                                trainerName: event.trainers[0].trainerName,
                                photo: event.trainers[0].photo
                            }
                        };
                    });
                });
        },
        showMatch(id) {
            // 在這裡處理當按鈕被點擊時的邏輯
        },
        initializeCalendar() {
            $('#calendarModal').on('shown.bs.modal', function (e) {
                const calendarEl = document.getElementById('calendar');
                const calendar = new FullCalendar.Calendar(calendarEl, {
                    initialView: 'dayGridMonth',
                    // 設定初始視圖為週視圖
                    initialView: 'timeGridWeek',
                    selectable: true,
                    allDaySlot: false,
                    // 設定語言
                    locale: 'zh-tw',
                    // 設定時間範圍，早上9點到晚上10點
                    slotMinTime: '09:00:00',
                    slotMaxTime: '22:00:00',
                    slotDuration: '01:00:00',  // 這裡設定每個時間格為一小時
                    height: 650,
                    titleFormat: { year: 'numeric' },  // 只顯示年分
                    // 顯示上一週、下一週和今天按鈕
                    headerToolbar: {
                        left: 'prev',
                        center: 'title',
                        right: 'next today'
                    },
                    events: this.events,
                    eventContent(arg) {
                        let buttons = `
        <button class="btn btn-available event-button" onclick="this.showEventDetails(${arg.event.id})">
            ${arg.event.title}
        </button>
        <!-- 在這裡添加更多的按鈕 -->
    `;
                        let moreButton = `
        <button class="btn more-button" onclick="this.toggleMore(this)">
            ...
        </button>
    `;
                        let html = `
        <div class="event-container">
            ${buttons}
            ${moreButton}
        </div>
    `;
                        return { html };
                    }
                    //eventClick: function (info) {
                    //    if (!memberIdFromSession) {
                    //        Swal.fire('提示', '尚未成為會員，無法進行預約', 'info');
                    //        return;
                    //    }
                    //    let memberId = info.event.extendedProps.memberId;
                    //    let courseStatus = info.event.extendedProps.courseStatus;
                    //    if (!memberId && courseStatus === '進行中') {
                    //        showModal(info.event);
                    //    }
                    //}
                });
                calendar.render();
            }.bind(this));
        },
        toggleMore(button) { //處理 “…” 按鈕的點擊事件
            let container = button.parentNode;
            container.classList.toggle('expanded');
        },
        showEventDetails(eventId) {
            let event = this.events.find(e => e.id === eventId);
            if (event) {
                Swal.fire({
                    title: event.extendedProps.trainerName,
                    text: `Class ID: ${event.classId}`,
                    imageUrl: event.extendedProps.photo,
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: 'Trainer photo',
                });
            }
        },
    }
}).mount("#MatchCalendar");