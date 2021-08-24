using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MyExpenses.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MyExpenses.Data.Interfaces;
using MyExpenses.Data.Services;
using System;
using Microsoft.OpenApi.Models;

namespace MyExpenses.API
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers(o =>
            {
                o.ReturnHttpNotAcceptable = true;
            })
                .AddNewtonsoftJson()
                .AddXmlDataContractSerializerFormatters();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "MyExpenses Api",
                    Version = "v1",
                });
            });

            services.AddDbContextPool<MyExpensesDbContext>(options =>
            {
                options.UseSqlServer(_configuration.GetConnectionString("MyExpensesDb"));
            });

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddScoped<IExpenseRepository, ExpenseRepository>();

            services.AddCors(options =>
            {
                options.AddPolicy("DevelopmentPolicy", builder =>
                {
                    builder.AllowAnyHeader();
                    builder.AllowAnyMethod();
                    builder.AllowAnyOrigin();
                });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCors("DevelopmentPolicy");
            }
            else
            {
                app.UseExceptionHandler();
            }

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "MyExpenses Api V1");
                c.RoutePrefix = string.Empty;
            });

            app.UseStatusCodePages();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
