// p090_event_loop.c
// https://github.com/libuv/libuv/blob/v1.x/src/unix/core.c

// code snippet -- CANNOT BE EXECUTED!
int uv_run(uv_loop_t* loop, uv_run_mode mode) {
    // [C-lang] 'libuv' library: supports asynchronous I/O
    // uv_loop_t* 'loop': a pointer to a uv_loop_t structure 'loop' (EVENT LOOP)
    // uv_run_mode 'mode': defines how the loop should run (blocking / non-blocking)

    r = uv__loop_alive(loop);
    // checks if EVENT LOOP is still ALIVE -> if the result 'r' is non-zero, the 'loop' is alive
    
    if (!r)  // if 'r' is ZERO, the function updates the current time of EVENT LOOP
        uv__update_time(loop);

    while (r != 0 && loop->stop_flag == 0) {
        // as long as 'r' is non-zero (= 'loop' is alive) & 'stop_flag' is NOT set (= 'loop' should continue running)
        uv__update_time(loop);
        uv__run_timers(loop);
        uv__run_pending(loop);
        uv__run_idle(loop);
        uv__run_prepare(loop);
        uv__io_poll(loop, timeout);
        uv__metrics_update_idle_time(loop);
        uv__run_check(loop);
        uv__run_closing_handles(loop);
        r = uv__loop_alive(loop);
    }
}