<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'content' => 'required|string|min:10',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Post title is required',
            'title.max' => 'Title must not exceed 255 characters',
            'content.required' => 'Post content is required',
            'content.min' => 'Content must be at least 10 characters',
        ];
    }
}