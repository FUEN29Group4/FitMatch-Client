const app2 = Vue.createApp({
    data() {
        const urlParams = new URLSearchParams(window.location.search);
        const trainerId = urlParams.get("id");

        return {
            trainerId: trainerId,
            isFavorite: false,
            someAnimationBoolean: false // 用於控制動畫
        };
    },
    methods: {
        async checkFavoriteTrainer() {
            const url = `https://localhost:7011/api/Trainer/GetFavoriteTrainer/${memberIdFromSession}`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    return;
                }
                const data = await response.json();
                const favoriteTrainer = data.find(item => item.trainerId == this.trainerId);

                if (favoriteTrainer) {
                    this.isFavorite = true;
                } else {
                    this.isFavorite = false;
                }
            } catch (error) {
                console.error('API接收內容錯誤:', error);
            }
        },
        toggleFavoriteTrainer() {
            if (this.isFavorite) {
                return;  // 如果已經是喜愛，則不做任何事
            }
            this.someAnimationBoolean = true;  // 啟動動畫
            if (memberIdFromSession) {
                const url = 'https://localhost:7011/api/Trainer/FavoriteTrainer';
                const data = {
                    memberId: memberIdFromSession,
                    trainerId: this.trainerId,
                };

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then((data) => {
                        if (data.status === "success") {
                            this.isFavorite = !this.isFavorite;
                            Swal.fire('提示', data.message, 'success');
                        } else {
                            Swal.fire('提示', data.message, 'error');
                        }
                        this.someAnimationBoolean = false; // 停止動畫
                    })
                    .catch((error) => {
                        console.error('加入收藏時出錯:', error);
                    });
                this.someAnimationBoolean = true;  // 啟動動畫
            } else {
                Swal.fire('提示', '尚未登入，無法進行收藏', 'info');
                return;
            }
        },
    },
    mounted() {
        if (memberIdFromSession) {
            this.checkFavoriteTrainer();
        }

    },
    template: `
        <div id="app2" class="pt-2">
            <a class="wish-btn" @click="toggleFavoriteTrainer">
                <div class="icon-container">
                    <i :class="isFavorite ? 'fa-solid fa-heart fa-2x' : 'fa-regular fa-heart fa-2x'"
                       :class="{ 'anim': someAnimationBoolean }"
                       style="color: red;"></i>
                </div>
            </a>
        </div>
    `,
}).mount("#app2");
