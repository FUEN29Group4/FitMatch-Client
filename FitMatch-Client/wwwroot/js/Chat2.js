

// 初始化 SignalR 连接
const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7011/chatHub")
    .configureLogging(signalR.LogLevel.Information)
    .build();


const chat = Vue.createApp({
    data() {
        return {
            ...sharedState,
            isChatHistoryVisible: false,
            chatHistory: [],
            message: "",
            senderId: null,
            receiverId: null,
            role: "", // 初始化为 null
            photoURLs: {},
        };
    },
    async created() {
        // 從 sessionStorage 中獲取 senderId 和 role
        this.senderId = sessionStorage.getItem('memberId') || sessionStorage.getItem('trainerId');
        this.role = sessionStorage.getItem('memberId') ? 'Member' : 'Trainer';

        // 啟動 SignalR 連線
        this.connect();
    },
    methods: {
        async loadPhoto(id, role) {//照片
            if (!this.photoURLs[id]) {
                try {
                    const response = await fetch(`https://localhost:7011/api/Chat/Photo/${id}/${role}`);
                    if (response.ok) {
                        //const url = await response.text();
                        //this.photoURLs[id] = url;
                        const jsonResponse = await response.json(); // 解析 JSON
                        const base64String = jsonResponse.photo; // 從 JSON 中提取出 base64 字串
                        this.photoURLs[id] = 'data:image/jpeg;base64,' + base64String;
                    }
                } catch (error) {
                    console.error("照片加載失敗:", error);
                }
            }
        },
        connect: async function () {
            if (connection.state === signalR.HubConnectionState.Disconnected) {
                // 處裡關閉事件
                if (!connection.connectionClosed) {
                    connection.onclose((error) => {
                        console.warn('連線已關閉:', error);
                        this.connect();
                    });
                    connection.connectionClosed = true;
                }

                try {
                    await connection.start();
                    console.log('連線已啟動！');
                } catch (err) {
                    console.error('建立連線時出錯 :', err);
                }
            } else {
                console.warn('連線失敗狀態:', connection.state);
            }// 訂閱接收消息事件
            connection.on("ReceiveMessage", (senderId, message, role) => {
                // 添加新消息到 chatHistory
                this.chatHistory.push({ senderId, messageContent: message, role });
                // 捲動到最新消息
                this.scrollToBottom();
            });
        },
        showChatHistory(receiverId) {
            this.receiverId = receiverId;
            this.isChatHistoryVisible = true;
            this.loadChatHistory();
            // 使用 $nextTick 讓聊天紀錄完成後自動跑到底部 但還沒實現之後再調整
            this.$nextTick(() => {
                this.scrollToBottom();
            });

        },
        scrollToBottom() {
            const chatBody = document.querySelector('.chat-body');
            if (chatBody) {
                chatBody.scrollTop = chatBody.scrollHeight;
            }
        },
        async loadChatHistory() {
            try {
                const response = await fetch(`https://localhost:7011/api/Chat/GetHistory/${this.senderId}/${this.receiverId}`);
                if (response.ok) {
                    const data = await response.json();
                    this.chatHistory = data;
                    // 加载照片
                    for (const msg of data) {
                        this.loadPhoto(msg.senderId, msg.role);
                    }
                }
            } catch (error) {
                console.error("找不到歷史對話紀錄:", error);
            }
        },
        async sendMessage(event) {
            if (event) event.preventDefault(); // 防止換行
            if (connection.state === signalR.HubConnectionState.Connected) {
                try {
                    await connection.invoke("SendMessage", this.receiverId, this.message, this.senderId, this.role);
                    //console.log('傳送訊息成功:',this.receiverId, this.message, this.senderId, this.role);
                    this.chatHistory.push({ senderId: this.senderId, messageContent: this.message, role: this.role });
                    //console.log('增加訊息成功:', this.senderId, this.message, this.role);
                    this.message = "";
                    this.$nextTick(() => {
                        const chatBody = document.querySelector('.chat-body');
                        chatBody.scrollTop = chatBody.scrollHeight;
                    });
                } catch (err) {
                    console.error("傳送訊息時出錯", err);
                }
            } else {
                console.warn('SignalR沒連結成功');

            }
        }
    }
}).mount("#chat");
