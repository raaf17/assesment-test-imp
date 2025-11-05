<?php

namespace App\Services;

use App\Models\Post;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class PostService
{
    /**
     * Get paginated posts with author information
     */
    public function getPaginatedPosts(int $perPage = 10): LengthAwarePaginator
    {
        return Post::withAuthor()
            ->latest()
            ->paginate($perPage);
    }

    /**
     * Get all posts (without pagination)
     */
    public function getAllPosts(): Collection
    {
        return Post::withAuthor()->latest()->get();
    }

    /**
     * Find post by ID with author
     */
    public function findPost(int $id): ?Post
    {
        return Post::withAuthor()->find($id);
    }

    /**
     * Create a new post
     */
    public function createPost(array $data, int $authorId): Post
    {
        return Post::create([
            'title' => $data['title'],
            'content' => $data['content'],
            'author_id' => $authorId,
        ]);
    }

    /**
     * Update existing post
     */
    public function updatePost(Post $post, array $data): Post
    {
        $post->update($data);
        return $post->fresh(['author']);
    }

    /**
     * Delete post
     */
    public function deletePost(Post $post): bool
    {
        return $post->delete();
    }

    /**
     * Check if user owns the post
     */
    public function userOwnsPost(Post $post, int $userId): bool
    {
        return $post->author_id === $userId;
    }
}