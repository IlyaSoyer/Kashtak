const CACHE = "kashtak-v33";
const CORE = ["./", "./index.html", "./manifest.json", "./icon.png", "./icon-192.png"];
const ASSETS = ["./bg1.png", "./bg2.png", "./intro_bg.png", "./logo.png", "./skate.png", "./hero_skate_sheet.png",
    "./boss.png", "./boss2.png", "./foe_h_sheet.png", "./foe_b_sheet.png", "./foe_a1_sheet.png", "./foe_a2_sheet.png",
    "./enemy_h_sheet.png", "./enemy_b_sheet.png", "./crate.png", "./crate_broken.png",
    "./hero_grab.png", "./hero_knee.png", "./hero_headbutt.png", "./hero_throw.png",
    "./foe_h_grabbed.png", "./foe_b_grabbed.png", "./foe_h_thrown.png", "./foe_b_thrown.png",
    "./runner_hero_sheet.png", "./runner_foe_h_sheet.png", "./runner_foe_b_sheet.png",
    "./runner_foe_a1_sheet.png", "./runner_boss_sheet.png", "./road_objects_sheet.png",
    "./runner_sky.png", "./runner_city.png",
    "./intro_music.mp3", "./level_music.mp3", "./level2_music.mp3",
    "./hero_idle.png", "./hero_punch.png", "./hero_block.png", "./hero_walk.png", "./hero_kick.png", "./hero_jump.png",
    "./hero_jumpkick.png", "./hero_crouch.png", "./hero_hurt.png", "./hero_down.png", "./hero_special.png", "./hero_win.png"];
self.addEventListener("install", function (e) {
    self.skipWaiting();
    e.waitUntil(caches.open(CACHE).then(function (c) {
        return c.addAll(CORE).then(function () {
            return Promise.all(ASSETS.map(function (u) { return c.add(u).catch(function () { }); }));
        }));
});});
self.addEventListener("activate", function (e) {
    e.waitUntil(caches.keys().then(function (keys) {
        return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
    if (e.request.method !== "GET") return;
    e.respondWith(caches.match(e.request).then(function (hit) {
        return hit || fetch(e.request).then(function (res) {
            if (res && res.status === 200) { const copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copy); }); }
            return res;
        }).catch(function () { return hit; });
    });
});