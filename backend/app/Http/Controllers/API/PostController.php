<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Services\PostService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function __construct(
        private PostService $postService
    ) {}

    /**
     * Display a listing of posts
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->get('per_page', 10);
        $posts = $this->postService->getPaginatedPosts($perPage);

        return response()->json([
            'success' => true,
            'data' => $posts->items(),
            'meta' => [
                'current_page' => $posts->currentPage(),
                'last_page' => $posts->lastPage(),
                'per_page' => $posts->perPage(),
                'total' => $posts->total(),
            ],
        ]);
    }

    /**
     * Store a newly created post
     */
    public function store(StorePostRequest $request): JsonResponse
    {
        try {
            $post = $this->postService->createPost(
                $request->validated(),
                auth()->id()
            );

            return response()->json([
                'success' => true,
                'message' => 'Post created successfully',
                'data' => $post->load('author'),
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create post',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified post
     */
    public function show(int $id): JsonResponse
    {
        $post = $this->postService->findPost($id);

        if (!$post) {
            return response()->json([
                'success' => false,
                'message' => 'Post not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $post,
        ]);
    }

    /**
     * Update the specified post
     */
    public function update(UpdatePostRequest $request, int $id): JsonResponse
    {
        $post = $this->postService->findPost($id);

        if (!$post) {
            return response()->json([
                'success' => false,
                'message' => 'Post not found',
            ], 404);
        }

        // Authorization check
        if (!$this->postService->userOwnsPost($post, auth()->id())) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to update this post',
            ], 403);
        }

        try {
            $updatedPost = $this->postService->updatePost($post, $request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Post updated successfully',
                'data' => $updatedPost,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update post',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified post
     */
    public function destroy(int $id): JsonResponse
    {
        $post = $this->postService->findPost($id);

        if (!$post) {
            return response()->json([
                'success' => false,
                'message' => 'Post not found',
            ], 404);
        }

        // Authorization check
        if (!$this->postService->userOwnsPost($post, auth()->id())) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to delete this post',
            ], 403);
        }

        try {
            $this->postService->deletePost($post);

            return response()->json([
                'success' => true,
                'message' => 'Post deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete post',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}