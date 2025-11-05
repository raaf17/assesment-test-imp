<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Post;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create demo users
        $users = [
            [
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'jane@example.com',
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => Hash::make('admin123'),
            ],
        ];

        foreach ($users as $userData) {
            $user = User::create($userData);
            
            // Create 5 posts for each user
            for ($i = 1; $i <= 5; $i++) {
                Post::create([
                    'title' => "Post {$i} by {$user->name}",
                    'content' => "This is the content of post {$i} created by {$user->name}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    'author_id' => $user->id,
                ]);
            }
        }
    }
}