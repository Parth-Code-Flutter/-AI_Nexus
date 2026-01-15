document.addEventListener('DOMContentLoaded', () => {
    // Check if user has already seen the popup
    if (localStorage.getItem('newsletter_seen') === 'true') {
        return;
    }

    // Delay for 3.5 seconds before showing
    setTimeout(showNewsletterModal, 3500);
});

function showNewsletterModal() {
    // blocked by local storage check above, but double check
    if (localStorage.getItem('newsletter_seen') === 'true') return;

    // Create Modal HTML
    const modalHTML = `
    <div id="newsletter-modal" class="fixed inset-0 z-[9999] flex items-center justify-center px-4 opacity-0 transition-opacity duration-500">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" onclick="closeNewsletter(false)"></div>
        
        <!-- Modal Content -->
        <div class="relative bg-[#0f172a] border border-white/10 rounded-2xl p-1 overflow-hidden shadow-2xl max-w-md w-full transform scale-95 transition-transform duration-300" id="newsletter-content">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 via-purple-500 to-pink-500"></div>
            
            <button onclick="closeNewsletter(true)" class="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors">
                <i class="fa-solid fa-times text-xl"></i>
            </button>

            <div class="p-8 text-center relative overflow-hidden">
                <!-- Background Glow -->
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brand-500/20 blur-[50px] -z-10 rounded-full"></div>

                <div class="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center mx-auto mb-5 text-2xl">
                    🔥
                </div>

                <h3 class="text-2xl font-bold text-white mb-2">Get the Top 1% of AI</h3>
                <p class="text-slate-400 text-sm mb-6">Join 5,000+ creators. Get the best new AI tools, assets, and tutorials delivered to your inbox weekly. No spam.</p>

                <form onsubmit="handleSubscribe(event)" class="space-y-3">
                    <input type="email" required placeholder="name@example.com" class="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500 transition-colors">
                    <button type="submit" class="w-full bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-brand-500/25">
                        Join Free
                    </button>
                    <p class="text-[10px] text-slate-600">Unsubscribe at any time.</p>
                </form>
            </div>
        </div>
    </div>
    `;

    // Inject into body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Trigger Animation (Next Tick)
    requestAnimationFrame(() => {
        const modal = document.getElementById('newsletter-modal');
        const content = document.getElementById('newsletter-content');
        if (modal && content) {
            modal.classList.remove('opacity-0');
            content.classList.remove('scale-95');
            content.classList.add('scale-100');
        }
    });

    // Mark as seen immediately so it doesn't annoy ONLY IF they interact? 
    // Usually better to mark as seen on CLOSE.
}

function closeNewsletter(permanently) {
    const modal = document.getElementById('newsletter-modal');
    if (!modal) return;

    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.remove();
    }, 500);

    if (permanently) {
        localStorage.setItem('newsletter_seen', 'true');
    }
}

function handleSubscribe(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerHTML;

    // Simulate Loading
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';

    setTimeout(() => {
        // Success State
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Welcome Aboard!';
        btn.classList.remove('from-brand-600', 'to-purple-600');
        btn.classList.add('bg-green-500');

        // Save to LocalStorage (So we never show it again)
        localStorage.setItem('newsletter_seen', 'true');

        // Close after 1.5s
        setTimeout(() => {
            closeNewsletter(true);
        }, 1500);
    }, 1000);
}
