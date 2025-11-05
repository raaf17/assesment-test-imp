<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthService
{
    /**
     * Register a new user
     */
    public function register(array $data): array
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $token = JWTAuth::fromUser($user);

        return [
            'user' => $user,
            'token' => $token,
        ];
    }

    /**
     * Login user and generate token
     */
    public function login(array $credentials): ?array
    {
        if (!$token = auth()->attempt($credentials)) {
            return null;
        }

        return [
            'user' => auth()->user(),
            'token' => $token,
        ];
    }

    /**
     * Logout user (invalidate token)
     */
    public function logout(): void
    {
        auth()->logout();
    }

    /**
     * Get authenticated user
     */
    public function me(): ?User
    {
        return auth()->user();
    }

    /**
     * Refresh token
     */
    public function refresh(): string
    {
        return auth()->refresh();
    }
}