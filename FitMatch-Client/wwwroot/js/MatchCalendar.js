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
            events: [], // 用來存儲從外部 API 獲取的事件
            calendar: null  // 用於存儲 FullCalendar 實例

        };
    },
    mounted() {
        // 這裡的this.gymId是您預設希望加載的場館ID。
        // 如果您想在組件開始時為所有場館加載事件，則可能需要稍微修改此函數。
        this.fetchEventsForgym(this.gymId);
    },
    methods: {
        formatTime(dateTimeString) { //轉換時間
            let date = new Date(dateTimeString);
            if (isNaN(date.getTime())) {
                // 不是有效的日期字符串，返回原始值
                return dateTimeString;
            }
            let year = date.getFullYear();
            let month = date.getMonth() + 1;  // 月份從0開始，所以加1
            let day = date.getDate();
            let hour = date.getHours();
            let minute = date.getMinutes();

            // 如果月或日或小時或分鐘是單數字，添加前導0
            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;
            hour = hour < 10 ? '0' + hour : hour;
            minute = minute < 10 ? '0' + minute : minute;

            return `${year}-${month}-${day} ${hour}:${minute}`;
        },
        setgym(id) {
            this.gymId = id;
            this.showCalendar = true;
            this.fetchEventsForgym(id); // 獲取場館的事件
            //this.initializeCalendar();  // 初始化 FullCalendar

        },
        fetchEventsForgym(gymid) {
            fetch(`https://localhost:7011/api/Reservation/MatchGym/${gymid}`)
                .then(response => {
                    //console.log(gymid);
                    if (!response.ok) {
                        throw new Error("API請求失敗" + response);
                    }
                    return response.json();
                })
                .then(data => {
                    this.events = data.map(event => {
                        return {
                            id: event.classId,
                            title: event.trainers[0].trainerName,
                            start: event.startTime,
                            end: event.endTime,
                            extendedProps: {
                                trainerName: event.trainers[0].trainerName,
                                photo: event.trainers[0].photo
                            }
                        };
                    });
                    this.initializeCalendar();  // 確保在數據更新後重新渲染日曆
                });
        },
        async showEventDetails(eventId) {
            eventId = Number(eventId); // 將eventId轉換為數字型別
            let event = this.events.find(e => e.id === eventId);
            if (event) {
                // 格式化時間
                const formattedStartTime = this.formatTime(event.start);
                const formattedEndTime = this.formatTime(event.end);
                // 獲取base64格式的圖片
                try {
                    Swal.fire({
                        title: `教練: ${event.extendedProps.trainerName}`,
                        html: `
                  <img src="data:image/jpeg;base64,${event.extendedProps.photo}" alt="Trainer photo" style="width: 400px; height: 200px;">
        <p>開始時間: ${formattedStartTime}</p>
        <p>結束時間: ${formattedEndTime}</p>
                `,
                        showCancelButton: true,
                        confirmButtonText: '確定預約',
                        cancelButtonText: '取消',
                        preConfirm: () => {
                            // 這裡可以放入您要執行的「確定預約」動作，例如發送API請求等。
                        }
                    });
                } catch (error) {
                    console.error("Error converting image to Base64:", error);
                }
            }
        },
        initializeCalendar() {
            const calendarEl = document.getElementById('calendar');
            if (this.calendar) {
                this.calendar.destroy();  // 如果日曆已經初始化，則先銷毀它
            }
            this.calendar = new FullCalendar.Calendar(calendarEl, {
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
                    let buttons = `<button class="btn btn-available event-button" >${arg.event.title}</button>`;
                    let html = `<div class="event-container">${buttons}</div>`;
                    return { html };
                },
                eventClick: (info) => {
                    this.showEventDetails(info.event.id);
                }
            });
            this.calendar.render();
        }
    }
}).mount("#MatchCalendar");
