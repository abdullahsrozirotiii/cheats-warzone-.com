export interface Review { user: string; rating: number; text: string }

const groups: [number, string][] = [
  [5, `warzone_beast|The UAV radar overlay is a complete game changer for Verdansk / Urzikstan rotations. Knowing exactly where teams are pushing makes late-game positioning effortless.
loot_goblin|Item ESP highlights high-tier weapons and loadout drops through walls instantly. Saved so much time looting in hot drops.
recoil_ctrl|No recoil script is butter smooth. Guns like the RAM-7 feel like lasers across long-range engagements.
aim_assist_pro|Silent aim settings are extremely configurable. You can adjust the FOV check so it looks completely legitimate on killcams.
ghost_sniper|Zero frame drops on my rig, injection takes less than 10 seconds. Best provider on the market by far.
warzone_predator_x|Updates are pushed out lightning fast after every major RICOCHET patch. Minimal downtime compared to shady competitors.
shadow_ops|Clean box and skeleton ESP. Doesn't clutter the main game screen or mess with your crosshair focus.
discord_mod|Customer support sorted out my hardware ID reset in under 5 minutes on Discord. Incredible service.
high_fps_club|Optimization is phenomenal. Maintains my monitor's max refresh rate without any micro-stutters.
trigger_happy|Triggerbot responsiveness is crisp. Sniping feels incredible when predictions line up perfectly.
lifetime_member|Got the lifetime package and it's easily the best investment I've made for custom lobby nights with friends.
clean_ui|Menu layout is super intuitive. Everything is clearly labeled and easy to bind to custom hotkeys.
rock_solid|Never faced a single crash during 6-hour battle royale sessions. Rock-solid stability.
instant_key|Received my license key in my email inbox the exact second payment cleared. Zero hassle.
tactical_mind|Health and armor bar metrics below enemy boxes help you pick your gunfights intelligently.
win_11_pro|Runs perfectly on Windows 11 without throwing any false security flags once you follow the setup guide.
vortex_gaming|Super simple installation process. Followed the 2-minute video tutorial and it worked instantly.
community_guy|Private chat community is great, lots of users sharing optimized smooth-aim configs.
safe_mode|Consistent, safe, and heavily optimized code architecture. Never looking anywhere else.
distance_calc|Accurate distance indicators help coordinate pushes with your quad stack seamlessly.
architect_99|Flawless execution. The devs clearly know the Call of Duty engine inside and out.
bomb_squad|Never experienced any hitching during intense final circle buyback rotations.
scale_master|Radar overlay scaling and opacity options are top tier. Perfect customization.
marathon_runner|Outstanding stability over long gaming marathons. Zero memory leaks.
fast_response|Fastest support response time of any digital service I've ever dealt with.
audio_cues|Helps you pre-aim corners when audio cues get bugged out in chaotic buildings.
minimal_hud|Clean configuration options. Tailor it to be minimal or detailed based on your preference.
no_brainer|Absolute perfection. Renewing my subscription is a total no-brainer.
utility_tracker|Highlights loadouts, cash drops, and active UAV towers through walls clearly.
angle_master|Incredible performance enhancement. Makes learning complex map sightlines way faster.
overlay_king|Seamless integration with overlay tools. Zero graphic or display conflicts.
gpu_friendly|Top-tier features with zero performance tax or load on the graphics card.
uptime_god|Reliable uptime and proactive developers who address engine changes immediately.
crisp_visuals|Super crisp visual rendering. Boxes never lag behind sprinting operators.
shooter_pack|Best utility package available for battle royale titles right now.
quick_deploy|Quick deployment, clear instructions, stellar overall user experience.
organic_aim|Smooth tracking options that don't look snappy, robotic, or suspicious.
peace_of_mind|Peace of mind while playing competitive matches is priceless, and this delivers.
status_check|Reliable server status checks integrated right inside the loader interface.
hwid_transfer|Fantastic product. Staff went above and beyond to verify my hardware ID transfer request.
high_hz|Seamless setup, high frame rates preserved completely across high-Hz monitors.
bulk_buyer|Great value for money when purchasing multi-month subscription packages.
bind_master|Clean menus and straightforward hotkey mapping for every feature.
team_color|Awesome color customization options for distinguishing different enemy squads.
instant_inject|Instantly injects without throwing any weird error codes.
solid_build|Solid reliability across all game modes. Five stars all around.
bloat_free|Effortless navigation, clean code, and zero bloatware.
zero_latency|Zero input lag introduced during high-intensity gunfights.
day_one_fan|Flawless operation from day one of purchase.
metric_pro|Crisp visuals and reliable metric indicators for distance and armor.
active_devs|Active developers, helpful community, and wonderful overall performance.`],
  [4, `casual_player|Great product overall, but initial setup required disabling Windows Defender real-time protection which took a few extra steps.
pixel_gamer|ESP works like a charm. Minor downside is the menu text is a bit small on high-res 4K screens.
byte_coder|Very stable software, though I wish there were more community preset configurations pre-loaded.
ticket_guy|Support took about 45 minutes to reply during peak weekend hours, but they solved my auth token issue cleanly.
smooth_run|Awesome performance once running. Just make sure you follow the installation manual word for word.
tuner_guy|Aimbot is smooth, though it took some fine-tuning to find a natural-feeling smoothing value for controller/mouse.
patch_day|Had a minor loader hiccup after a recent game update, but re-flashing fixed it right up.
fps_hunter|Solid features and zero FPS drop. Price is a little high for monthly renewals, but quality makes up for it.
stealth_mode|Great toolset, negligible impact on performance. Would love an integrated cleaner tool included.
menu_tab|Menu design is clean, though navigating tabs with mouse clicks feels slightly stiff at times.
lobby_cleaner|Took me a minute to figure out the hotkeys, but once configured, it ran without a hitch.
win_eleven|Works well on Windows 11. Had to add a folder exclusion to my third-party antivirus manually.
critic_corner|Very reliable service. Downtime during major game updates is usually short, though can occasionally take half a day.
radar_scale|Good customizability for visuals. Wish the radar widget had finer scaling increments though.
gateway_pay|Solid experience. Payment options are straightforward and keys arrive instantly via email.
lag_free|No input latency added. Very clean execution code architecture.
map_reader|Good performance in BR. Item and gadget ESP sometimes loads a second late on chaotic hot drops.
manual_reader|Everything works as advertised. Documentation could use a few more screenshots for rookies.
crypto_user|Very dependable. Only giving 4 stars because crypto payment confirmation had a slight gateway delay.
long_session|Great stability during long gaming sessions. No memory leaks observed over 4+ hours.
color_picker|ESP colors are easy to tweak. Default neon options are a bit too bright for dark rooms.
support_team|Reliable product with active developers. Happy with the purchase overall.
borderless_pc|Works great, but make sure your display mode in-game is set to borderless windowed for best overlay placement.
trial_pass|Solid utility and features. Wish there was a 3-day trial option instead of a straight monthly lock-in.
telegram_chat|Good performance, low footprint. Support staff on Telegram are polite and efficient.
recoil_tuner|Aimbot options are vast. Took some time testing to find what felt right for specific weapon recoil patterns.
font_size|Clean UI elements. Font scaling could be slightly sharper on smaller laptop screens.
crash_handler|Dependable software that rarely crashes. Updates are handled professionally by staff.
frame_rate|Solid features, zero noticeable drop in frame rates. Very happy with the purchase.
loader_ui|Good experience overall. Loader interface is straightforward and simple to execute.
core_tweak|Reliable toolset. Minor configuration tweaks needed for optimal smoothness, but functions great.
vibe_check|Solid performance across all map pools. Customer service is responsive and polite.
hardware_guy|Runs stable on modern hardware. Worth checking out if you need consistent visual data.
zen_mode|Good layout and simple config files. Very few complaints overall.
node_master|Stable and secure. Loader interface is lightweight and functional.
overlay_fix|Great utility overall. Minor setup adjustments required if you run third-party recording overlays.
frame_pace|Smooth execution and consistent frame pacing. Solid 4-star provider.
key_master|Good customer service and reliable keys. Happy with the overall upkeep.
seamless_run|Solid tracking options. Takes a bit of manual tweaking to get it feeling completely seamless.
build_quality|Dependable build quality. Updates roll out efficiently after minor title updates.
cpu_opt|Clean visual features. Resource usage is minimal and well-optimized for mid-tier CPUs.
step_guide|Good product reliability. Setup guide is easy enough to follow step-by-step.
match_stable|Solid stability during extended matches. Very low crash rate.
quick_menu|Effective tool package. Menu navigation is quick and responsive.
metric_check|Good performance metrics. Satisfied with the overall software purchase.
backend_ok|Reliable software backend. Minimal configuration friction out of the box.
competitive_guy|Solid utility features. Great option for regular competitive players.
prompt_supp|Clean execution and prompt support responses when minor issues pop up.
clean_expect|Dependable performance. Meets all core expectations cleanly.
fast_load|Great overall toolset with solid stability and fast loading times.`],
  [3, `complex_setup|It works, but the installation process was way more complicated than advertised. Had to reinstall the runtime libraries twice.
smoke_lag|Performance is okay, but I noticed occasional micro-stutters during heavy smoke drops on final circles.
slow_email|Took nearly 30 minutes for my key to arrive in my email inbox after payment cleared. Support didn't answer right away.
patch_downtime|Software gets disabled for too long whenever Activision pushes a hotfix. Down for almost a full day last week.
mid_fight_lag|The menu overlay feels a bit clunky and laggy when opening it up mid-gunfight during hectic moments.
config_hassle|Too much manual configuration required. Default settings are pretty much unusable and take an hour to tweak right.
fps_loss|Dropped about 15-20 frames on my mid-range GPU. Had to lower my in-game settings to compensate.
ticket_wait|Support ticket system takes forever. Had to ask three times in the community Discord just to get a reply.
flicker_bug|Box ESP occasionally flickers on distant operators across large open terrain maps.
pricey_tier|A bit overpriced for what it offers compared to other providers on the current market.
hwid_lock|Changing my RAM kit locked my hardware ID, and waiting for an admin to reset it took half a day.
room_to_grow|Not bad, but definitely room for improvement on the UI design and stability front.
hotkey_reset|Custom keybinds keep resetting every time I restart the loader application. Kind of annoying.
server_blip|Experienced connection blips in the loader server multiple times today. Needs better server infrastructure.
stiff_aim|ESP is great, but the aimbot options feel stiff and unnatural unless heavily adjusted.`],
  [2, `injection_fail|Kept crashing my game every single time I tried to inject during the pre-game lobby warmup phase. Wasted half my subscription day troubleshooting.
ignored_ticket|Tried reaching out on Discord regarding a payment verification error and got ignored by staff for over 6 hours. Disappointing customer service.
offline_days|Software is down way too often for updates. Out of a 30-day subscription, it felt like it was offline or patching for at least 6 days total.
mouse_stutter|Introduces severe mouse stuttering on my setup regardless of what smoothing settings I change. Unusable for competitive play in its current state.`],
];

export const reviews: Review[] = groups.flatMap(([rating, text]) => text.split('\n').map(line => {
  const [user, ...parts] = line.split('|');
  return { user: `@${user}`, rating, text: parts.join('|') };
}));
export const reviewGroups = [5, 4, 3, 2].map(rating => ({ rating, reviews: reviews.filter(review => review.rating === rating) }));
