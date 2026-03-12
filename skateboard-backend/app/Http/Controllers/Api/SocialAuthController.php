<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class SocialAuthController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')
            ->stateless()
            ->with(['prompt' => 'select_account'])
            ->redirect();
    }

    public function callback()
    {
        try {
            $googleUser = Socialite::driver('google')
                ->stateless()
                ->setHttpClient(new \GuzzleHttp\Client(['verify' => false]))
                ->user();

            $user = User::updateOrCreate([
                'email' => $googleUser->getEmail(),
            ], [
                'name' => $googleUser->getName(),
                // Fill random password if password is required by DB, but typically nullable for social.
                'password' => bcrypt(Str::random(16)), 
            ]);

            // Assuming we use Sanctum to issue token
            $token = $user->createToken('auth_token')->plainTextToken;

            // Redirect back to frontend with the token
            $frontendUrl = env('FRONTEND_URL', 'http://localhost:3000');
            return redirect()->away($frontendUrl . '/auth/callback?token=' . $token);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Google Auth Error: ' . $e->getMessage());
            $frontendUrl = env('FRONTEND_URL', 'http://localhost:3000');
            return redirect()->away($frontendUrl . '/auth/login?error=google_login_failed&msg=' . urlencode($e->getMessage()));
        }
    }
}
