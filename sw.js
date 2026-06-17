const CACHE_NAME = 'novel-app-v1';

// 监听安装事件
self.addEventListener('install', (event) => {
    // 强制跳过等待，让新的 SW 立即激活
    self.skipWaiting();
});

// 监听激活事件
self.addEventListener('activate', (event) => {
    // 立即接管客户端
    event.waitUntil(self.clients.claim());
});

// 监听网络请求（简单的按需缓存策略，确保 PWA 状态通过检查）
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // 如果缓存里有，优先从缓存读取；没有则发起网络请求
            return response || fetch(event.request);
        }).catch(() => {
            // 离线容错返回机制
            return new Response('App is offline');
        })
    );
});
